import { Middleware } from '../types';
import { Request, Response, NextFunction } from 'express';
import HttpResponse from '../exceptions/http/HttpResponse';
import { NoHttpResponseException } from '..';

/**
 * An wrapper for every route
 * Help prevent 'unhandledRejection' to be thrown
 * Here is the root point when we catch any 'unhandledRejection
 * Also identifies and sends HttpResponses accordingly
 */
export default (requestHandler: Middleware) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await requestHandler(req, res, next);

    if (result instanceof HttpResponse) return result.send(res);

    throw new NoHttpResponseException();
  } catch (err) {
    next(err);
  }
};

// lala
