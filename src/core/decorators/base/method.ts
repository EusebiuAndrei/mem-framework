import CQHandler from '../../@cqs/CQHandler';
import { HTTPMethods } from '../../@cqs/cqs';
import { wow } from '..';

export function method(httpMethod: HTTPMethods) {
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
        method: httpMethod,
      });
      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
