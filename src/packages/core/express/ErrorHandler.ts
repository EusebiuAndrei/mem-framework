import express, { Express, Request, Response, NextFunction } from 'express';
import { HttpError, InternalError } from '../exceptions';
import { environment } from '../helpers';

class ErrorHandler {
  readonly app: Express = express();
  private readonly logger: any;

  constructor(app: Express, logger: any) {
    this.app = app;
    this.logger = logger;
  }

  async handleErrors() {
    // this.use404Middleware();
    this.useErrorMiddleware();
    this.handleUncaughtExceptions();
  }

  // use404Middleware() {
  //   // catch 404 and forward to error handler
  //   this.app.use((req, res, next) => next(new NotFoundError()));
  // }

  useErrorMiddleware() {
    // Middleware Error Handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      if (err instanceof HttpError) {
        // HttpError.handle(err, res);
        err.send(res);
      } else {
        if (environment === 'development') {
          this.logger.error(err);
          return res.status(500).send(err.message);
        }
        new InternalError().send(res);
        // HttpError.handle(new InternalError(), res);
      }
    });
  }

  handleUncaughtExceptions() {
    process.on('uncaughtException', (e) => {
      this.logger.error(e);
    });
  }
}

export default ErrorHandler;
