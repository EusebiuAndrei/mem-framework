import { ControllerMetadata, RouteMetadata } from '../../types';
import { CONTROLLER_METADATA_KEY, ROUTE_METADATA_KEY } from './constants';

type Constructor = { new (...args: any[]): {} };
type MethodDecoratorParams = {
  target: Record<string, any>; // Object
  propertyKey: string | symbol;
  descriptor: PropertyDescriptor;
};

/**
 * adds to / modifies {@link RouteMetadata} to the class/method
 * @param middlewares an indefinite number of middleware functions
 * @returns  a decorated class/method with metadata which helps to add a middleware to the resource/route
 */
export const Use = (...middlewares: Function[]) =>
  function (...props: any): void {
    if (props.length === 1) {
      const [constructor] = props;
      useMiddlewareConstructor(middlewares, constructor);
    } else {
      const [target, propertyKey, descriptor] = props;
      useMiddlewareRoute(middlewares, { target, propertyKey, descriptor });
    }
  };

function useMiddlewareConstructor(middlewares: Function[], contructor: Constructor): void {
  const controllerMeta: ControllerMetadata = Reflect.getMetadata(
    CONTROLLER_METADATA_KEY,
    contructor,
  );

  const newControllerMeta = {
    ...controllerMeta,
    middlewares,
  };

  Reflect.defineMetadata(CONTROLLER_METADATA_KEY, newControllerMeta, contructor);
}

function useMiddlewareRoute(
  middlewares: Function[],
  { target, propertyKey, descriptor }: MethodDecoratorParams,
): void {
  const routeMeta: RouteMetadata = Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);

  const newRouteMeta = {
    ...routeMeta,
    middlewares,
  };

  Reflect.defineMetadata(ROUTE_METADATA_KEY, newRouteMeta, target, propertyKey);
}
