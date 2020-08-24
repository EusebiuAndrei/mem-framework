import Joi from '@hapi/joi';

export const userId = Joi.object().keys({
  id: Joi.string().required(), // JoiObjectId().required(),
  msg: Joi.string(), // for tests
});

export type UserId = {
  id: string;
  msg?: string;
};
