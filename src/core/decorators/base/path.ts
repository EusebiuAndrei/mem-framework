import CQHandler from '../../@cqs/CQHandler';
import { CQMethod } from '../../types';

export function path(resourcePath: string) {
  const decorator = function (
    target: CQHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (this.decorated) return method.apply(this, args);

      const methodDecoratorsPayload = this.decoratorsPayload.get(propertyKey);
      this.decoratorsPayload.set(propertyKey, {
        ...methodDecoratorsPayload,
        path: resourcePath,
      });

      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
