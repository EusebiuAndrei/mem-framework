import { ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions';

const httpExceptionErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return err.send(res);
  }

  next(err);
};

export default httpExceptionErrorMiddleware;
