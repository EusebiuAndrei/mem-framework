import { Response, NextFunction } from 'express';
import { CQSRequest, GenericDictionary } from 'app-request';

export interface DecorateWithCQSProps<TContext, TInfo> {
  args?(req: CQSRequest<TContext, TInfo>, res: Response): GenericDictionary;
  context(req: CQSRequest<TContext, TInfo>, res: Response): TContext;
  info(req: CQSRequest<TContext, TInfo>, res: Response): TInfo;
}

const decorateWithCQS = <TContext, TInfo>(props: DecorateWithCQSProps<TContext, TInfo>) => (
  req: CQSRequest<TContext, TInfo>,
  res: Response,
  next: NextFunction,
) => {
  const { query, params, body } = req;

  // There are specific to a request (local)
  const defaultArgs = { ...query, ...params, ...body };
  const args: GenericDictionary = props.args ? props.args(req, res) : { ...defaultArgs };

  // These are available across any request (global)
  // This is where we should extract the user from the authorization token or make any similar operation from a cookie
  // const defaultContext = { cookies, signedCookies };
  // const ctx = props.context ? props.context(req, res) : { ...defaultContext };
  const ctx = props.context(req, res);

  // These are additional information about the request - not pretty sure what to put here yet
  // const info = props.info ? props.info(req, res) : req;
  const info = props.info(req, res);

  req.cqs = { args, ctx, info };

  next();
};

export default decorateWithCQS;
