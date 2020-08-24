import { Request } from 'express';
import User from '../database/model/User';
import Keystore from '../database/model/Keystore';

interface GenericDictionary {
  [key: string]: any;
}

declare interface CQSRequest<TContext, TInfo> extends Request {
  cqs: {
    args: GenericDictionary;
    ctx: TContext;
    info: TInfo; // Omit<Request, 'query' | 'params' | 'body' | 'cookies' | 'signedCookies'>;
  };
}
declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
