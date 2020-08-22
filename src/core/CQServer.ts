import express, { Express } from 'express';
import { DecorateWithCQSProps } from './decorateWithCQS';
import Logger from './Logger';
import { port } from '../config';
import { CQS } from './cqs';
import ErrorHandler from './ErrorHandler';
import MiddlewareHandler from './MiddlewareHandler';
import QueryHandler from './QueryHandler';

interface CQServerProps extends DecorateWithCQSProps {
  queries: any[];
  mutations: any[];
}

class CQServer {
  readonly app: Express = express();
  readonly cqs: DecorateWithCQSProps;
  readonly queries: QueryHandler[];
  readonly mutations: any[];

  constructor(props: CQServerProps) {
    this.cqs = { args: props.args, context: props.context, info: props.info };
    this.queries = props.queries;
    this.mutations = props.mutations;

    // this.run();
  }

  async handleQueries() {
    if (!this.queries.length) {
      throw new Error('No queries provided');
    }

    this.queries.forEach((queryHandler) => {
      queryHandler.handleQueries(this.app, this.cqs);
      this.app.use(queryHandler.router);
    });
  }

  async handleMutations() {
    if (!this.mutations.length) {
      throw new Error('No mutations provided');
    }

    this.mutations.forEach((query) => CQS(this.app, this.cqs, query));
  }

  async run() {
    const middlewareHandler = new MiddlewareHandler(this.app);
    const errorHandler = new ErrorHandler(this.app);

    await middlewareHandler.useConfigMiddlewares();
    // this.app.use(decorateWithCQS(this.cqs));
    await this.handleQueries();
    // this.handleMutations();
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
