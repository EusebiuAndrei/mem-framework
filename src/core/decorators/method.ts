import QueryHandler from '../QueryHandler';
import { HTTPMethods } from '../cqs';
import { wow } from '.';

export function method(httpMethod: HTTPMethods) {
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
        method: httpMethod,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
