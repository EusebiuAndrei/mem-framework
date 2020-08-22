import MutationHandler from '../@cqs/MutationHandler';
import { wow } from '.';

// @method + @path
export function post(resourcePath?: string) {
  const decorator = function (
    target: MutationHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const queryDecorators = this.mutations.get(propertyKey);
      this.mutations.set(propertyKey, {
        ...queryDecorators,
        method: 'post',
        path: resourcePath || queryDecorators.path,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
