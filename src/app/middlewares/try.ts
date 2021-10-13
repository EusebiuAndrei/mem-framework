import { NextFunction, Request, Response } from 'express';

const tryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('TRY Middleware');
  return next();
};

export default tryMiddleware;
