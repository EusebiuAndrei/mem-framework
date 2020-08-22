import QueryHandler from '../QueryHandler';
import { wow } from '.';

// @method + @path
export function get(resourcePath?: string) {
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
        method: 'get',
        path: resourcePath || queryDecorators.path,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
