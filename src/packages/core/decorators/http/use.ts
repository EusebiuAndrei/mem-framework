import { ControllerMetadata, HttpMethod, RouteMetadata } from '../../types';
import { CONTROLLER_METADATA_KEY, ROUTE_METADATA_KEY } from './constants';

type Constructor = { new (...args: any[]): {} };
type MethodDecoratorParams = {
  target: Record<string, any>; // Object
  propertyKey: string | symbol;
  descriptor: PropertyDescriptor;
};

export const UseUniversal = (...middlewares: Function[]) =>
  function (props: Constructor | MethodDecoratorParams): void {
    if ('target' in props) {
      // Method decorator
      const { target, propertyKey, descriptor } = props;
      const routeMeta: RouteMetadata = Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);

      const newRouteMeta = {
        ...routeMeta,
        middlewares,
      };

      Reflect.defineMetadata(ROUTE_METADATA_KEY, newRouteMeta, target, propertyKey);
    } else {
      // Class decorator
      const contructor = props;
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
  };

export const Use = (...middlewares: Function[]) =>
  function (contructor: Constructor): void {
    const controllerMeta: ControllerMetadata = Reflect.getMetadata(
      CONTROLLER_METADATA_KEY,
      contructor,
    );

    const newControllerMeta = {
      ...controllerMeta,
      middlewares,
    };

    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, newControllerMeta, contructor);
  };

export const UseR = (...middlewares: Function[]): MethodDecorator =>
  function (props: MethodDecoratorParams) {
    const { target, propertyKey, descriptor } = props;
    const routeMeta: RouteMetadata = Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);

    const newRouteMeta = {
      ...routeMeta,
      middlewares,
    };

    Reflect.defineMetadata(ROUTE_METADATA_KEY, newRouteMeta, target, propertyKey);
  };
