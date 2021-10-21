import { ControllerMetadata } from '../../types';
import { CONTROLLER_METADATA_KEY } from './constants';

/**
 * adds {@link ControllerMetadata} to the class
 * @param path the path of the resource
 * @returns a decorated class with metadata which helps to represent a api http resource
 */
export const Controller = (path: string) =>
  function <T extends { new (...args: any[]): {} }>(contructor: T): T | void {
    const controllerMeta: ControllerMetadata = Reflect.getMetadata(
      CONTROLLER_METADATA_KEY,
      contructor,
    );

    const newControllerMeta = {
      ...controllerMeta,
      path,
    };

    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, newControllerMeta, contructor);

    return contructor;
  };

export const getControllerMetadata = (object: Record<string, any>) => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  const meta: ControllerMetadata = Reflect.getMetadata(CONTROLLER_METADATA_KEY, constructor);
  return meta;
};

export const isDecoratedWithController = (object: Record<string, any>): boolean => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  return Reflect.hasMetadata(CONTROLLER_METADATA_KEY, constructor);
};
