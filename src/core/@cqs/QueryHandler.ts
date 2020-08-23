import express, { Express } from 'express';
import Joi from '@hapi/joi';
import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { QueryMethods } from '../@cqs/cqs';
import { seal } from '../decorators';

type QueryDecorators = {
  method: QueryMethods;
  path: string;
  schema: Joi.ObjectSchema<any>;
  middlewares: any[];
};

class QueryHandler {
  private decorated = false;
  public readonly router = express.Router();
  private queries: Map<string, QueryDecorators> = new Map<string, QueryDecorators>();

  constructor() {
    this.initializeQueries();
    this.decorateQueries();
  }

  @seal
  private getQueriesPropertyDescriptor(): Array<{ name: string; descriptor: PropertyDescriptor }> {
    return Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this)))
      .map(([propertyDescriptorName, propertyDescriptor]) => ({
        name: propertyDescriptorName,
        descriptor: propertyDescriptor,
      }))
      .filter((queryPropertyDescriptor) => queryPropertyDescriptor.name !== 'constructor');
  }

  private initializeQueries(): void {
    const queryNames = this.getQueriesPropertyDescriptor().map(({ name }) => name);
    queryNames.forEach((queryName) =>
      this.queries.set(queryName, {
        method: 'get',
        path: '',
        schema: Joi.object().keys({}),
        middlewares: [],
      }),
    );
  }

  private decorateQueries(): void {
    this.getQueriesPropertyDescriptor().forEach(({ descriptor: { value: method } }) =>
      method.call(this),
    );

    this.decorated = true;
  }

  public handleQueries(app: Express, cqs: DecorateWithCQSProps): void {
    this.getQueriesPropertyDescriptor().forEach(({ name, descriptor: { value: query } }) => {
      const props = this.queries.get(name);
      const middlewares = [
        ...props.middlewares,
        decorateWithCQS(cqs),
        validator(props.schema, ValidationSource.ARGS),
      ];

      this.router[props.method](
        props.path,
        ...middlewares,
        asyncHandler(async (req: CQSRequest) => {
          const { args, ctx, info } = req.cqs;
          return query.call(this, args, ctx, info);
        }),
      );
    });
  }
}

export default QueryHandler;
