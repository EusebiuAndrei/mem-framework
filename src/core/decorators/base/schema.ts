import ActionHandler from '../../@cqs/ActionHandler';
import { CQMethod } from '../../types';
import { ClassType } from 'class-transformer/ClassTransformer';

export function schema(SchemaType: ClassType<unknown>) {
  const decorator = function (
    target: ActionHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        SchemaType: SchemaType,
      });

      if (this.decorated) return method.apply(this, args);
      else return null;
    };

    return descriptor;
  };
  return decorator;
}
