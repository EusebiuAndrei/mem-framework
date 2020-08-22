import { Request, Response, NextFunction, Express, Router } from 'express';
import { CQSRequest, GenericDictionary } from 'app-request';
import Joi from '@hapi/joi';
import { ValidationSource } from '../helpers/validator';
import validator from '../helpers/validator';
import asyncHandler from '../helpers/asyncHandler';
import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';

export type HTTPMethods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type QueryMethods = 'all' | 'get' | 'head';
export type MutationMethods = 'post' | 'put' | 'delete' | 'patch' | 'options';

export type QueryHandler<QueryArgs, QueryResult, Context, Info> = (
  args: QueryArgs,
  ctx: Context,
  info: Info,
) => QueryResult; // Promise<QueryResult>;

export type MutationHandler<MutationArgs, MutationResult, Context, Info> = (
  args: MutationArgs,
  ctx: Context,
  info: Info,
) => MutationResult; // Promise<MutationResult>;

export type DispatchProps = {
  method: HTTPMethods;
  resource: string; // Later a regex validation here
  schema: Joi.ObjectSchema<any>;
  middlewares?: any[];
  handler:
    | QueryHandler<any, any, any, GenericDictionary> // Omit<Request, 'query' | 'params' | 'body'>>
    | MutationHandler<any, any, any, GenericDictionary>; // Omit<Request, 'query' | 'params' | 'body'>>,
};

// export type Dispatch = (
//   props: DispatchProps,
// ) => (req: Request, res: Response, next: NextFunction) => Promise<void | any>;

export type Dispatch = (app: Express, cqs: DecorateWithCQSProps, props: DispatchProps) => Express;

export const QueryHttpMethods = ['get', 'head', 'all'];
export const MutationHttpMethods = ['post', 'put', 'patch', 'delete', 'options'];

export const CQS: Dispatch = (app, cqs, props) =>
  app[props.method](
    props.resource,
    ...(props.middlewares || []),
    decorateWithCQS(cqs),
    validator(props.schema, ValidationSource.ARGS),
    asyncHandler(async (req: CQSRequest, res: Response) => {
      const { args, ctx, info } = req.cqs;
      return props.handler(args, ctx, info);
    }),
  );

/*
export const CQSDispatch: Dispatch = (handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { query, params, body, cookies, signedCookies } = req;

    // There are specific to a request (local)
    const args = { ...query, ...params, ...body };

    // These are available across any request (global)
    const ctx: any = { user: { isAuthenticated: false }, cookies, signedCookies };
    // Here we extract the user from the authorization token or make any similar operation from a cookie
    if (req.headers.authorization) {
      ctx.user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    // These are additional information about the request
    const info = req;
    delete info.query;
    delete info.params;
    delete info.body;
    delete info.cookies;
    delete info.signedCookies;
    // console.log('INFO', info);

    if (QueryHttpMethods.includes(req.method.toLowerCase())) {
      // Here we have a query
      try {
        const result = await handler(args, ctx, info);
        return res.status(200).send(result);
      } catch (err) {
        return next(err);
      }
    }

    if (MutationHttpMethods.includes(req.method.toLowerCase())) {
      // Here we have a mutation
      try {
        const result = await handler(args, ctx, info);
        return res.status(201).send(result);
      } catch (err) {
        return next(err);
      }
    }

    return next({ message: 'Incorrect Http Method' });
  };
};
*/
