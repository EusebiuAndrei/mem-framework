import CQHandler from '../../@cqs/CQHandler';
import { CQMethod } from '../../types';
import { ValidationSource } from '../../helpers/validator';
import validator from '../../helpers/validator';
import { ClassType } from 'class-transformer/ClassTransformer';

export function schema<T>(SchemaType: ClassType<unknown>) {
  const decorator = function (
    target: CQHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // console.log(some, typeof some);
      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        // schema: validationSchema,
        validator: validator(SchemaType, ValidationSource.ARGS),
      });

      if (this.decorated) return method.apply(this, args);
      else return null;
    };

    return descriptor;
  };
  return decorator;
}
