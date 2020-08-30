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
  @MinLength(10)
  @MaxLength(20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
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
