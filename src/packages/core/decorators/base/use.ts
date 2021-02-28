import BaseController from '../../@cqs/BaseController';
import { CQMethod } from '../../types';

export function use(middlewares: any[]) {
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
        middlewares,
      });

      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
