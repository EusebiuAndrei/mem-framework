import { Request, Response } from 'express';

export type HTTPMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type CQMethod = (req: Request, res: Response) => any;

// Brand new

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  ALL = 'all',
  HEAD = 'head',
  OPTIONS = 'options',
}

export interface ControllerMetadata {
  path: string;
  middlewares?: Function[];
}

export interface RouteMetadata {
  path: string;
  method: HttpMethod;
  middlewares?: Function[];
}
