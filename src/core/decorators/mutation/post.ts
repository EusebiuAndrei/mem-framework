import MutationHandler from '../../@cqs/MutationHandler';
import { wow } from '..';

// @method + @path
export function post(resourcePath?: string) {
  const decorator = function (
    target: MutationHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        method: 'post',
        path: resourcePath || methodDecoratorsPayload.path,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
