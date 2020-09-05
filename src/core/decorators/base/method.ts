import ActionHandler from '../../@cqs/ActionHandler';
import { HTTPMethod, CQMethod } from '../../types';

export function method(httpMethod: HTTPMethod) {
  const decorator = function (
    target: ActionHandler,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<CQMethod>,
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (this.decorated) return method.apply(this, args);

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
