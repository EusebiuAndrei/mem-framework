import { CQMethod } from '../../types';
import BaseController from '../../@cqs/BaseController';

// @method + @path
export function post(resourcePath?: string) {
  const decorator = function (
    target: BaseController,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (this.decorated) return method.apply(this, args);

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
