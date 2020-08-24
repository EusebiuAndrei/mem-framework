import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import Logger from '../core/Logger';
import { BadRequestError } from '../core/api/ApiError';
import { Types } from 'mongoose';
import { CQSRequest } from 'app-request';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
  ARGS = 'cqs',
}

export const JoiObjectId = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
    return value;
  }, 'Object Id Validation');

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) return helpers.error('any.invalid');
    return value;
  }, 'Url Endpoint Validation');

export const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
    if (!value.split(' ')[1]) return helpers.error('any.invalid');
    return value;
  }, 'Authorization Header Validation');

export default <TContext, TInfo>(
  schema: Joi.ObjectSchema,
  source: ValidationSource = ValidationSource.BODY,
) => (req: CQSRequest<TContext, TInfo>, res: Response, next: NextFunction) => {
  try {
    // console.log(req.cqs.args);
    // console.log(source);
    const validationSchema = source === ValidationSource.ARGS ? req.cqs.args : req[source];
    console.log(schema);
    // console.log(args); //
    //
    const { error } = schema.validate(validationSchema);

    if (!error) return next();

    const { details } = error;
    const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
    Logger.error(message);

    next(new BadRequestError(message));
  } catch (error) {
    next(error);
  }
};
