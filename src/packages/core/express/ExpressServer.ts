import { InternalException } from './../exceptions/http/HttpExceptions';
import { HttpExceptionErrorMiddleware, InternalServerErrorMiddleware } from '../middlewares';
import { ControllerMetadata, RouteMetadata } from './../types';
import {
  MissingControllersException,
  ControllerWithoutMetadataException,
} from './../exceptions/framework/index';
import express, { ErrorRequestHandler, Express, Request, RequestHandler, Response } from 'express';
import {
  getControllerMetadata,
  getRouteMetadata,
  isDecoratedWithController,
  isDecoratedWithRoute,
} from '../decorators';
import asyncRequestHandlerWrapper from './asyncRequestHandlerWrapper';

interface ExpressServerOptions {
  port: number;
}

abstract class ExpressServer {
  abstract setupMiddlewares(): Promise<void>;
  abstract setupErrorMiddlewares(): Promise<void>;

  private readonly app: Express = express();
  private readonly controllers: any[];

  private readonly options: ExpressServerOptions;
  private readonly logger: any;

  protected constructor(
    controllers: any[],
    dependencies: { logger: any },
    options: ExpressServerOptions,
  ) {
    this.controllers = controllers;
    this.logger = dependencies.logger;
    this.options = options;
  }

  protected useMiddleware(middleware: RequestHandler) {
    this.app.use(middleware);
  }

  protected useErrorMiddleware(errorMiddleware: ErrorRequestHandler) {
    this.app.use(errorMiddleware);
  }

  async handleControllers() {
    if (!this.controllers.length) {
      throw new MissingControllersException();
    }

    this.controllers.forEach((controller) => {
      if (!isDecoratedWithController(controller)) {
        throw new ControllerWithoutMetadataException();
      }

      const controllerMetadata = getControllerMetadata(controller);
      const propertyDescriptors = Object.getOwnPropertyDescriptors(
        Object.getPrototypeOf(controller),
      );

      Object.keys(propertyDescriptors).forEach((propertyKey) => {
        if (!isDecoratedWithRoute(controller, propertyKey)) return;

        const routeMetadata = getRouteMetadata(controller, propertyKey);
        const middlewares = getRouteMiddlewares(controllerMetadata, routeMetadata);
        const errorMiddlewares = getRouteErrorMiddlewares(controllerMetadata, routeMetadata);

        // ! app[routeMethod]
        this.app[routeMetadata.method](
          getRoutePath(controllerMetadata, routeMetadata),
          middlewares,
          asyncRequestHandlerWrapper(async (req: Request, res: Response) => {
            // @ts-ignore
            return controller[propertyKey].call(controller, req, res);
          }),
          errorMiddlewares,
        );
      });
    });
  }

  async run() {
    handleProcessErrors(this.logger);

    await this.setupMiddlewares();

    await this.handleControllers();

    this.app.use(HttpExceptionErrorMiddleware);
    await this.setupErrorMiddlewares();
    this.app.use(InternalServerErrorMiddleware(this.logger));
  }

  async listen() {
    await this.run();
    this.app
      .listen(this.options.port, () => {
        this.logger.info(`server running on port : ${this.options.port}`);
        console.log(`server running on port : ${this.options.port}`);
      })
      .on('error', (e) => this.logger.error(e));
  }
}

export default ExpressServer;

const getRoutePath = (controllerMetadata: ControllerMetadata, routeMetadata: RouteMetadata) => {
  const resourceName = controllerMetadata.path;
  const routePath = routeMetadata.path;

  if (!resourceName) return `/${routePath}`;
  if (!routePath) return `/${resourceName}`;

  return `/${resourceName}/${routePath}`;
};

const getRouteMiddlewares = (
  controllerMetadata: ControllerMetadata,
  routeMetadata: RouteMetadata,
) => {
  const middlewares = [
    ...(controllerMetadata.middlewares ?? ([] as any[])),
    ...(routeMetadata.middlewares ?? ([] as any[])),
  ];

  return middlewares;
};

const getRouteErrorMiddlewares = (
  controllerMetadata: ControllerMetadata,
  routeMetadata: RouteMetadata,
) => {
  const errorMiddlewares = [
    ...(controllerMetadata.errorMiddlewares ?? ([] as any[])),
    ...(routeMetadata.errorMiddlewares ?? ([] as any[])),
  ];

  return errorMiddlewares;
};

const handleProcessErrors = (logger: any) => {
  process.on('uncaughtException', (e) => {
    logger.error(e);
    process.exit(1);
  });
};
