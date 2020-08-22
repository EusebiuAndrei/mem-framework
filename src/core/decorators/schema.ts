import Joi from '@hapi/joi';
import QueryHandler from '../QueryHandler';
import { wow } from '.';

export function schema(validationSchema: Joi.ObjectSchema<any>) {
  const decorator = function (
    target: QueryHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const queryDecorators = this.queries.get(propertyKey);
      this.queries.set(propertyKey, {
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
