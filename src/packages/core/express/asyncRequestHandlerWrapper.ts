import { Request, Response, NextFunction, RequestHandler } from 'express';
import HttpResponse from '../exceptions/http/HttpResponse';
import { NoHttpResponseException } from '..';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (requestHandler: AsyncRequestHandler | RequestHandler) => async (
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
