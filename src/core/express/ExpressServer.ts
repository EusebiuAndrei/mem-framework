import { HttpExceptionErrorMiddleware, InternalServerErrorMiddleware } from '../middlewares';
import { Middleware, ErrorMiddleware } from '../types';
import {
  MissingControllersException,
  ControllerWithoutMetadataException,
  ControllerWithEmptyPathException,
} from '../exceptions/framework/index';
import express, { Express, Request, Response, Router } from 'express';
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

/**
 * The Core class
 * It represents a server running over express
 * It's the place that wires together all the controllers, middlewares and error middlewares
 */
abstract class ExpressServer {
  abstract setupMiddlewares(): Promise<void>;
  abstract setupErrorMiddlewares(): Promise<void>;

  private readonly app: Express = express();
  private readonly controllers: any[];
  private routers: Record<string, Router> = {};

  private readonly options: ExpressServerOptions;
  private readonly logger: any;

  public constructor(
    controllers: any[],
    dependencies: { logger: any },
    options: ExpressServerOptions,
  ) {
    this.controllers = controllers;
    this.logger = dependencies.logger;
    this.options = options;
  }

  protected useMiddleware(middleware: Middleware) {
    this.app.use(middleware);
  }

  protected useErrorMiddleware(errorMiddleware: ErrorMiddleware) {
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

      if (controllerMetadata.path.length === 0) {
        throw new ControllerWithEmptyPathException();
      }

      const controllerMiddlewares = controllerMetadata.middlewares ?? ([] as any[]);
      const controllerErrorMiddlewares = controllerMetadata.errorMiddlewares ?? ([] as any[]);

      const router = Router();

      router.use(controllerMiddlewares);
      attachHandlersToRouter(controller, router);
      router.use(controllerErrorMiddlewares);

      this.routers[controllerMetadata.path] = router;
    });

    Object.entries(this.routers).forEach(([resourceName, router]) => {
      this.app.use(`/${resourceName}`, router);
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

const handleProcessErrors = (logger: any) => {
  process.on('uncaughtException', (e) => {
    logger.error(e);
    process.exit(1);
  });
};

const attachHandlersToRouter = (controller: any, router: Router) => {
  const propertyDescriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(controller));

  Object.keys(propertyDescriptors).forEach((propertyKey) => {
    if (!isDecoratedWithRoute(controller, propertyKey)) return;

    const routeMetadata = getRouteMetadata(controller, propertyKey);
    const routeMiddlewares = routeMetadata.middlewares ?? ([] as any[]);
    const routeErrorMiddlewares = routeMetadata.errorMiddlewares ?? ([] as any[]);

    router[routeMetadata.method](
      routeMetadata.path,
      routeMiddlewares,
      asyncRequestHandlerWrapper(async (req: Request, res: Response) => {
        // @ts-ignore
        return controller[propertyKey].call(controller, req, res);
      }),
      routeErrorMiddlewares,
    );
  });
};
