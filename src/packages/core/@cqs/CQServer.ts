import express, { Express, NextFunction, Request, Response } from 'express';
import Logger from '../Logger';
import { port } from '../../../config';
import MiddlewareHandler from './MiddlewareHandler';
import ErrorHandler from './ErrorHandler';
import { ACIFactory } from './types';
import {
  getControllerMetadata,
  getRouteMetadata,
  isDecoratedWithController,
  isDecoratedWithRoute,
} from '../decorators';
import asyncHandler from '../helpers/asyncHandler';

export interface CQServerProps<TContext> {
  controllers: any[];
}

class CQServer<TContext> {
  readonly app: Express = express();
  readonly factory: ACIFactory<TContext>;
  readonly controllers: any[];

  constructor(props: CQServerProps<TContext>) {
    this.controllers = props.controllers;
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
          console.log('Controller', controllerMeta.middlewares);
          console.log('Route', routeMeta.middlewares);
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
    const middlewareHandler = new MiddlewareHandler(this.app);
    const errorHandler = new ErrorHandler(this.app);

    await middlewareHandler.useConfigMiddlewares();
    await this.handleControllers();
    await errorHandler.handleErrors();
  }

  async listen() {
    await this.run();
    this.app
      .listen(port, () => {
        Logger.info(`server running on port : ${port}`);
      })
      .on('error', (e) => Logger.error(e));
  }
}

export default CQServer;
