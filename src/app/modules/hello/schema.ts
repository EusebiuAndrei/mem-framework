import Joi from '@hapi/joi';
import 'joi-extract-type';

export const userId = Joi.object().keys({
  id: Joi.string().required(), // JoiObjectId().required(),
  msg: Joi.string(), // for tests
});

export type UserId = {
  id: string;
  msg?: string;
};

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
  @MinLength(3)
  id: string;
}
