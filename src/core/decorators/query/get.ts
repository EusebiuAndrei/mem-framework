import QueryHandler from '../../@cqs/QueryHandler';
import { wow } from '..';

// @method + @path
export function get(resourcePath?: string) {
  const decorator = function (
    target: QueryHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        method: 'get',
        path: resourcePath || methodDecoratorsPayload.path,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
