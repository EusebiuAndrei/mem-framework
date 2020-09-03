import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../core/helpers/validator';

export default {
  userId: Joi.object().keys({
    id: Joi.string().required(), // JoiObjectId().required(),
    msg: Joi.string(), // for tests
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    profilePicUrl: Joi.string().optional().uri(),
  }),
};
