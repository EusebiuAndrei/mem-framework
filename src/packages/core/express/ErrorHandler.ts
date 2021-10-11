import express, { Express, Request, Response, NextFunction } from 'express';
import { NotFoundError, ApiError, InternalError } from '../exceptions';
import Logger from '../Logger';
import { environment } from '../config';

class ErrorHandler {
  readonly app: Express = express();

  constructor(app: Express) {
    this.app = app;
  }

  async handleErrors() {
    // this.use404Middleware();
    this.useErrorMiddleware();
    this.handleUncaughtExceptions();
  }

  use404Middleware() {
    // catch 404 and forward to error handler
    this.app.use((req, res, next) => next(new NotFoundError()));
  }

  useErrorMiddleware() {
    // Middleware Error Handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      if (err instanceof ApiError) {
        ApiError.handle(err, res);
      } else {
        if (environment === 'development') {
          Logger.error(err);
          return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
      }
    });
  }

  handleUncaughtExceptions() {
    process.on('uncaughtException', (e) => {
      Logger.error(e);
    });
  }
}

export default ErrorHandler;
