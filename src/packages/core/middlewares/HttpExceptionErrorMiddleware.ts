import { ErrorRequestHandler } from 'express';
import { InternalException } from '../exceptions';
import { environment } from '../helpers';

const httpExceptionErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (environment === 'development') {
    // TODO: Use IOC logger
    console.error(err);
    return res.status(500).send(err.message);
  }

  new InternalException().send(res);
};

export default httpExceptionErrorMiddleware;
