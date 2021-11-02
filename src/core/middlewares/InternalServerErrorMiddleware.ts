import { ErrorRequestHandler } from 'express';
import { InternalException } from '../exceptions';
import { environment } from '../helpers';

const internalServerErrorMiddleware: (logger: any) => ErrorRequestHandler = (logger) => (
  err,
  req,
  res,
  next,
) => {
  if (environment === 'development') {
    logger.error(err);
    return res.status(500).send(err.message);
  }

  new InternalException().send(res);
};

export default internalServerErrorMiddleware;
