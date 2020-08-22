import QueryHandler from '../QueryHandler';
import { wow } from '.';

export function path(resourcePath: string) {
  const decorator = function (
    target: QueryHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const queryDecorators = this.queries.get(propertyKey);
      this.queries.set(propertyKey, { ...queryDecorators, path: resourcePath });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
