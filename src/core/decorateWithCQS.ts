import { Response, NextFunction } from 'express';
import { CQSRequest, GenericDictionary } from 'app-request';

interface DecorateWithCQSProps {
  args?(req: CQSRequest, res: Response): GenericDictionary;
  context?(req: CQSRequest, res: Response): GenericDictionary;
  info?(req: CQSRequest, res: Response): GenericDictionary;
}

const decorateWithCQS = (props: DecorateWithCQSProps) => (
  req: CQSRequest,
  res: Response,
  next: NextFunction,
) => {
  const { query, params, body, cookies, signedCookies } = req;

  // There are specific to a request (local)
  const defaultArgs = { ...query, ...params, ...body };
  const args = props.args ? props.args(req, res) : { ...defaultArgs };

  // These are available across any request (global)
  // This is where we should extract the user from the authorization token or make any similar operation from a cookie
  const defaultContext = { cookies, signedCookies };
  const ctx = props.context ? props.context(req, res) : { ...defaultContext };

  // These are additional information about the request - not pretty sure what to put here yet
  const info = props.info ? props.info(req, res) : req;

  req.cqs = { args, ctx, info };

  next();
};

export default decorateWithCQS;
