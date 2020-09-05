import express, { Express } from 'express';
import Logger from '../Logger';
import { port } from '../../config';
import MiddlewareHandler from './MiddlewareHandler';
import ErrorHandler from './ErrorHandler';
import QueryHandler from './QueryHandler';
import MutationHandler from './MutationHandler';
import { ACIFactory } from './types';

export interface CQServerProps<TContext> {
  queries: QueryHandler[];
  mutations: MutationHandler[];
  factory: ACIFactory<TContext>;
}

class CQServer<TContext> {
  readonly app: Express = express();
  readonly factory: ACIFactory<TContext>;
  readonly queries: QueryHandler[];
  readonly mutations: MutationHandler[];

  constructor(props: CQServerProps<TContext>) {
    this.factory = props.factory;
    this.queries = props.queries;
    this.mutations = props.mutations;
  }

  async handleQueries() {
    if (!this.queries.length) {
      throw new Error('No queries provided');
    }

    this.queries.forEach((queryHandler) => {
      queryHandler.handle(this.factory);
      this.app.use(`/${queryHandler.resource}`, queryHandler.router);
    });
  }

  async handleMutations() {
    if (!this.mutations.length) {
      throw new Error('No mutations provided');
    }

    this.mutations.forEach((mutationHandler) => {
      mutationHandler.handle(this.factory);
      this.app.use(`/${mutationHandler.resource}`, mutationHandler.router);
    });
  }

  async run() {
    const middlewareHandler = new MiddlewareHandler(this.app);
    const errorHandler = new ErrorHandler(this.app);

    await middlewareHandler.useConfigMiddlewares();
    await this.handleQueries();
    await this.handleMutations();
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
