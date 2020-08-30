import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import Logger from '../Logger';
import { BadRequestError } from '../api/ApiError';
import { Types } from 'mongoose';
import { CQSRequest } from 'app-request';
import { plainToClass } from 'class-transformer';
import { validate, IsDefined } from 'class-validator';

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
) => async (req: CQSRequest<TContext, TInfo>, res: Response, next: NextFunction) => {
  try {
    // console.log(req.cqs.args);
    // console.log(source);
    const validationSchema = source === ValidationSource.ARGS ? req.cqs.args : req[source];

    // class-validator
    const post = plainToClass(Post, validationSchema);
    // console.log(schema);
    // console.log(args); //
    const classErrors = await validate(post);

    if (classErrors && classErrors.length > 0) {
      next(new BadRequestError(classErrors[0].toString()));
    }
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

// ==============
import {
  Contains,
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
  IsFQDN,
  IsDate,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';

export enum PostType {
  Public,
  Private,
}

export class Post {
  @MinLength(10)
  @MaxLength(20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @IsDefined()
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDate()
  createDate: Date;

  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @MinLength(3, { each: true, message: 'Tag is too short. Minimal length is $value characters' })
  @MaxLength(50, { each: true, message: 'Tag is too long. Maximal length is $value characters' })
  tags: string[];

  @IsEnum(PostType)
  type: PostType;
}
