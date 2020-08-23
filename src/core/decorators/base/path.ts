import CQHandler from '../../@cqs/CQHandler';
import { wow } from '..';

export function path(resourcePath: string) {
  const decorator = function (
    target: CQHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<wow>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
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
