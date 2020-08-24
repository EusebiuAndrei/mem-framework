import QueryHandler from '../../@cqs/QueryHandler';
import { CQMethod } from '../../types';

// @method + @path
export function get(resourcePath?: string) {
  const decorator = function (
    target: QueryHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (this.decorated) return method.apply(this, args);

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
