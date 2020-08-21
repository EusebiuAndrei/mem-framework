import express, { Express, Request, Response, NextFunction } from 'express';
import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import { NotFoundError, ApiError, InternalError } from './ApiError';
import Logger from './Logger';
import { corsUrl, environment, port } from '../config';
import cors from 'cors';
import { CQS } from './cqs';
import bodyParser from 'body-parser';
import { SuccessResponse } from './ApiResponse';
import schema from '../routes/v1/profile/schema';
import path from 'path';
import fs from 'fs';

interface CQServerProps extends DecorateWithCQSProps {
  queries: any[];
  mutations: any[];
}

class CQServer {
  readonly app: Express = express();
  readonly cqs: DecorateWithCQSProps;
  readonly queries: any[];
  readonly mutations: any[];

  constructor(props: CQServerProps) {
    this.cqs = { args: props.args, context: props.context, info: props.info };
    this.queries = props.queries;
    this.mutations = props.mutations;

    // this.run();
  }

  async useConfigMiddlewares() {
    const middlewaresDirPath = path.join(__dirname, '..', 'middlewares');
    const files = await fs.promises.readdir(middlewaresDirPath);
    const moduleNames = files.filter((file) => file.endsWith('.js'));

    for (const moduleName of moduleNames) {
      const modulePath = path.join(__dirname, '..', 'middlewares', moduleName);
      const { default: middlewares } = await import(modulePath);
      if (middlewares && middlewares.length > 0) {
        middlewares.forEach((middleware: any) => {
          this.app.use(middleware);
        });
      }
    }
  }

  async handleErrors() {
    this.use404Middleware();
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

  async handleQueries() {
    if (!this.queries.length) {
      throw new Error('No queries provided');
    }

    this.queries.forEach((query) => CQS(this.app, this.cqs, query));
  }

  async handleMutations() {
    if (!this.mutations.length) {
      throw new Error('No mutations provided');
    }

    this.mutations.forEach((query) => CQS(this.app, this.cqs, query));
  }

  async run() {
    await this.useConfigMiddlewares();
    this.app.use(decorateWithCQS(this.cqs));
    await this.handleQueries();
    // this.handleMutations();
    await this.handleErrors();
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

/*
async useConfigMiddlewares() {
    // this.app.use(bodyParser.json({ limit: '10mb' }));
    // this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    // this.app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  }
*/
