import { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from 'express';
import { HttpMethod } from './constants';

export interface HttpResponseSender {
  send(res: Response): Response;
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export type AsyncErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export type Middleware = RequestHandler | AsyncRequestHandler;
export type ErrorMiddleware = ErrorRequestHandler | AsyncErrorRequestHandler;

export interface ControllerMetadata {
  path: string;
  middlewares?: Middleware[];
  errorMiddlewares?: ErrorMiddleware[];
}

export interface RouteMetadata {
  path: string;
  method: HttpMethod;
  middlewares?: Middleware[];
  errorMiddlewares?: ErrorMiddleware[];
}
