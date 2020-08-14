import { Request, Response, NextFunction } from 'express';
import { CQSRequest, GenericDictionary } from 'app-request';

export type QueryHandler<QueryArgs, QueryResult, Context, Info> = (
  args: QueryArgs,
  ctx: Context,
  info: Info,
) => Promise<QueryResult>;

export type MutationHandler<MutationArgs, MutationResult, Context, Info> = (
  args: MutationArgs,
  ctx: Context,
  info: Info,
) => Promise<MutationResult>;

export type Dispatch = (
  handler:
    | QueryHandler<any, any, any, GenericDictionary> // Omit<Request, 'query' | 'params' | 'body'>>
    | MutationHandler<any, any, any, GenericDictionary>, // Omit<Request, 'query' | 'params' | 'body'>>,
) => (req: Request, res: Response, next: NextFunction) => Promise<void | any>;

type AllMethods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export const QueryHttpMethods = ['get', 'head', 'all'];
export const MutationHttpMethods = ['post', 'put', 'patch', 'delete', 'options'];

export const CQS: Dispatch = (handler) => {
  return async (req: CQSRequest, res: Response, next: NextFunction) => {
    const { args, ctx, info } = req.cqs;

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
