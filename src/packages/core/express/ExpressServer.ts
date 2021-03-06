import express, { Express, NextFunction, Request, Response } from 'express';
import Logger from '../Logger';
import { port } from '../../../config';
import ErrorHandler from './ErrorHandler';
import {
  getControllerMetadata,
  getRouteMetadata,
  isDecoratedWithController,
  isDecoratedWithRoute,
} from '../decorators';
import { asyncHandler } from '../helpers';

abstract class ExpressServer {
  abstract async useMiddlewares(app: Express): Promise<void>;

  private readonly app: Express = express();
  private readonly controllers: any[];

  protected constructor(controllers: any[]) {
    this.controllers = controllers;
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

          this.app.get(
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
    const errorHandler = new ErrorHandler(this.app);

    // await middlewareHandler.useConfigMiddlewares();
    await this.useMiddlewares(this.app);
    await this.handleControllers();
    await errorHandler.handleErrors();
  }

  async listen() {
    await this.run();
    this.app
      .listen(port, () => {
        Logger.info(`server running on port : ${port}`);
        console.log(`server running on port : ${port}`);
      })
      .on('error', (e) => Logger.error(e));
  }
}

export default ExpressServer;
