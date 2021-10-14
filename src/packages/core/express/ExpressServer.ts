import express, { Express, NextFunction, Request, Response } from 'express';
import ErrorHandler from './ErrorHandler';
import {
  getControllerMetadata,
  getRouteMetadata,
  isDecoratedWithController,
  isDecoratedWithRoute,
} from '../decorators';
import { asyncHandler } from '../helpers';

interface ExpressServerOptions {
  port: number;
}

abstract class ExpressServer {
  abstract useMiddlewares(app: Express): Promise<void>;

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

  async handleControllers() {
    if (!this.controllers.length) {
      throw new Error('No controllers provided');
    }

    this.controllers.forEach((controller) => {
      if (!isDecoratedWithController(controller)) {
        throw new Error('Provided a Controller without decoration');
      }

      const propertyDescriptors = Object.getOwnPropertyDescriptors(
        Object.getPrototypeOf(controller),
      );

      Object.keys(propertyDescriptors).forEach((propertyKey) => {
        const controllerMeta = getControllerMetadata(controller);

        if (isDecoratedWithRoute(controller, propertyKey)) {
          const routeMeta = getRouteMetadata(controller, propertyKey);
          const middlewares = [
            ...(controllerMeta.middlewares ?? ([] as any[])),
            ...(routeMeta.middlewares ?? ([] as any[])),
          ];

          // ! app[routeMethod]
          this.app[routeMeta.method](
            `/${controllerMeta.path}/${routeMeta.path}`,
            middlewares,
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
              // @ts-ignore
              return controller[propertyKey].call(controller, req, res);
            }),
          );
        }
      });
    });
  }

  async run() {
    // const middlewareHandler = new MiddlewareHandler(this.app);
    const errorHandler = new ErrorHandler(this.app, this.logger);

    // await middlewareHandler.useConfigMiddlewares();
    await this.useMiddlewares(this.app);
    await this.handleControllers();
    await errorHandler.handleErrors();
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
