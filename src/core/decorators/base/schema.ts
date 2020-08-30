import Joi from '@hapi/joi';
import CQHandler from '../../@cqs/CQHandler';
import { CQMethod } from '../../types';

export function schema(validationSchema: Joi.ObjectSchema<any>, some?: any) {
  const decorator = function (
    target: CQHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(some, typeof some);
      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        schema: validationSchema,
      });

      if (this.decorated) return method.apply(this, args);
      else return null;
    };

    return descriptor;
  };
  return decorator;
}
