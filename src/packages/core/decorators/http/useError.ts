import { ErrorMiddleware } from './../../types';
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
 * @param errorMiddlewares an indefinite number of error middleware functions
 * @returns  a decorated class/method with metadata which helps to add an error middleware to the resource/route
 */
export const UseError = (...errorMiddlewares: ErrorMiddleware[]) =>
  function (...props: any): void {
    if (props.length === 1) {
      const [constructor] = props;
      useErrorMiddlewareConstructor(errorMiddlewares, constructor);
    } else {
      const [target, propertyKey, descriptor] = props;
      useErrorMiddlewareRoute(errorMiddlewares, { target, propertyKey, descriptor });
    }
  };

function useErrorMiddlewareConstructor(
  errorMiddlewares: ErrorMiddleware[],
  contructor: Constructor,
): void {
  const controllerMeta: ControllerMetadata = Reflect.getMetadata(
    CONTROLLER_METADATA_KEY,
    contructor,
  );

  const newControllerMeta = {
    ...controllerMeta,
    errorMiddlewares,
  };

  Reflect.defineMetadata(CONTROLLER_METADATA_KEY, newControllerMeta, contructor);
}

function useErrorMiddlewareRoute(
  errorMiddlewares: Function[],
  { target, propertyKey, descriptor }: MethodDecoratorParams,
): void {
  const routeMeta: RouteMetadata = Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);

  const newRouteMeta = {
    ...routeMeta,
    errorMiddlewares,
  };

  Reflect.defineMetadata(ROUTE_METADATA_KEY, newRouteMeta, target, propertyKey);
}
