import QueryHandler from '../@cqs/QueryHandler';
import MutationHandler from '../@cqs/MutationHandler';
import { wow } from '.';

export function use(middleware: any) {
  const decorator = function (
    target: QueryHandler | MutationHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const requests = this.queries || this.mutations;
      const requestDecorators = requests.get(propertyKey);
      requests.set(propertyKey, {
        ...requestDecorators,
        middlewares: [...requestDecorators.middlewares, middleware],
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
