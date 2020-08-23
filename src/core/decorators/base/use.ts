import CQHandler from '../../@cqs/CQHandler';
import { wow } from '..';

export function use(middleware: any) {
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
        middlewares: [...methodDecoratorsPayload.middlewares, middleware],
      });

      return method.apply(this, args);
    };

    return descriptor;
  };
  return decorator;
}
