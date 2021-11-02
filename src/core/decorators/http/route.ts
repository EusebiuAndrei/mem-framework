import { HttpMethod } from '../../constants';
import { RouteMetadata } from '../../types';
import { ROUTE_METADATA_KEY } from './constants';

/**
 * adds {@link RouteMetadata} to the method
 * @param method the Http Method
 * @param path the path of the resource
 * @returns a decorated method with metadata which helps to represent an api http route
 */
export const Route = (method: HttpMethod, path = ''): MethodDecorator =>
  function (
    target: Record<string, any>, // Object
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const routeMeta: RouteMetadata = Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);

    const newRouteMeta = {
      ...routeMeta,
      method,
      path,
    };

    Reflect.defineMetadata(ROUTE_METADATA_KEY, newRouteMeta, target, propertyKey);
  };

export const Get = (path?: string) => Route(HttpMethod.GET, path);
export const Post = (path?: string) => Route(HttpMethod.POST, path);
export const Put = (path?: string) => Route(HttpMethod.PUT, path);
export const Patch = (path?: string) => Route(HttpMethod.PATCH, path);
export const Delete = (path?: string) => Route(HttpMethod.DELETE, path);
export const All = (path?: string) => Route(HttpMethod.ALL, path);
export const Head = (path?: string) => Route(HttpMethod.HEAD, path);
export const Options = (path?: string) => Route(HttpMethod.OPTIONS, path);

export const getRouteMetadata = (
  object: Record<string, any>,
  propertyKey: string,
): RouteMetadata => {
  return Reflect.getMetadata(ROUTE_METADATA_KEY, object, propertyKey);
};

export const isDecoratedWithRoute = (object: Record<string, any>, propertyKey: string): boolean => {
  return Reflect.hasMetadata(ROUTE_METADATA_KEY, object, propertyKey);
};
