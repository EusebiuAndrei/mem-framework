import { Request, Response } from 'express';

// ACI = Args - Context - Info

export interface BaseContext {
  cookies: any;
  signedCookies: any;
}

export interface Info {
  req: Request;
  res: Response;
}

export interface ACI<TContext> {
  args: Record<string, any>;
  context: TContext;
  info: Info;
}

export interface ACIFactory<TContext> {
  args?(req: Request): Record<string, any>;
  context?(req: Request): TContext;
}
