import QueryHandler from '../@cqs/QueryHandler';
import MutationHandler from '../@cqs/MutationHandler';
import { wow } from '.';

export function path(resourcePath: string) {
  const decorator = function (
    target: QueryHandler | MutationHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const requests = this.queries || this.mutations;
      const queryDecorators = requests.get(propertyKey);
      requests.set(propertyKey, { ...queryDecorators, path: resourcePath });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
