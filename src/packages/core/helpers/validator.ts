// import Joi from '@hapi/joi';
// import { Request, Response, NextFunction } from 'express';
// import Logger from '../Logger';
// import { BadRequestError } from '../api/ApiError';
// import { Types } from 'mongoose';
// import { plainToClass } from 'class-transformer';
// import { validate, IsDefined } from 'class-validator';
// import { ClassType } from 'class-transformer/ClassTransformer';

// export enum ValidationSource {
//   BODY = 'body',
//   HEADER = 'headers',
//   QUERY = 'query',
//   PARAM = 'params',
//   ARGS = 'cqs',
// }

// export default <TContext = any, TInfo = any>(
//   SchemaType: ClassType<unknown>,
//   source: ValidationSource = ValidationSource.BODY,
// ) => async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // console.log(req.cqs.args);
//     // console.log(source);
//     const validationSchema = req[source];
//     //
//     // class-validator
//     console.log(validationSchema);
//     const post = plainToClass(SchemaType, validationSchema);
//     console.log(post);
//     // console.log(schema);
//     // console.log(args); //
//     const classErrors = await validate(post);

//     if (classErrors && classErrors.length > 0) {
//       next(new BadRequestError(classErrors[0].toString()));
//     } else {
//       return next();
//     }
//     // //
//     // const { error } = schema.validate(validationSchema);

//     // if (!error) return next();

//     // const { details } = error;
//     // const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
//     // Logger.error(message);

//     // next(new BadRequestError(message));
//   } catch (error) {
//     next(error);
//   }
// };

// export const JoiObjectId = () =>
//   Joi.string().custom((value: string, helpers) => {
//     if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
//     return value;
//   }, 'Object Id Validation');

// export const JoiUrlEndpoint = () =>
//   Joi.string().custom((value: string, helpers) => {
//     if (value.includes('://')) return helpers.error('any.invalid');
//     return value;
//   }, 'Url Endpoint Validation');

// export const JoiAuthBearer = () =>
//   Joi.string().custom((value: string, helpers) => {
//     if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
//     if (!value.split(' ')[1]) return helpers.error('any.invalid');
//     return value;
//   }, 'Authorization Header Validation');

const a = () => '';
export default a;
