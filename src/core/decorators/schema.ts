import Joi from '@hapi/joi';
import QueryHandler from '../@cqs/QueryHandler';
import MutationHandler from '../@cqs/MutationHandler';
import { wow } from '.';

export function schema(validationSchema: Joi.ObjectSchema<any>) {
  const decorator = function (
    target: QueryHandler | MutationHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const requests = this.queries || this.mutations;
      const queryDecorators = requests.get(propertyKey);
      requests.set(propertyKey, {
        ...queryDecorators,
        schema: validationSchema,
      });

      if (this.decorated) return method.apply(this, args);
      else return null;
    };

    return descriptor;
  };
  return decorator;
}
