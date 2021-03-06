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
    api.send(res);
  } catch (err) {
    next(err);
  }
};
