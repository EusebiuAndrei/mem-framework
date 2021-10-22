import { HttpError } from './../exceptions/api/ApiError';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../exceptions';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // execution(req, res, next).catch(next);
  try {
    const api: ApiResponse = await execution(req, res, next);
    if (api instanceof ApiResponse) return api.send(res);
    // else ?
  } catch (err) {
    if (err instanceof HttpError) {
      return err.send(res);
    }

    next(err);
  }
};
