import { Request, Response, NextFunction } from 'express';
import { ApiError, ApiResponse } from '../exceptions';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // execution(req, res, next).catch(next);
  try {
    const api: ApiResponse | ApiError = await execution(req, res, next);
    if (api instanceof ApiResponse) api.send(res);
    else ApiError.handle(api, res);
  } catch (err) {
    next(err);
  }
};
