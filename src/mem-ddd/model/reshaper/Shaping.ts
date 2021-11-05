import { ObjectLiteral } from '../../types';
import { Constructor } from './types';
import { plainToClass } from 'class-transformer';

export type MapFrom<TSource, TDestination> = (obj: TSource) => any;

export interface ShapingOptions {
  transformObjectToClassInstance: boolean;
}

const defaultShapingOptions: ShapingOptions = {
  transformObjectToClassInstance: false,
};

class Shaping<TSource extends ObjectLiteral, TDestination extends ObjectLiteral> {
  private source: Constructor;
  private destination: Constructor;

  private options: ShapingOptions;
  private actions = new Map<keyof TDestination, MapFrom<TSource, TDestination>>();
  private expantions = new Map<string, (obj: TSource) => any>();

  constructor(source: Constructor, destination: Constructor, options?: ShapingOptions) {
    this.source = source;
    this.destination = destination;
    this.options = options ?? defaultShapingOptions;
  }

  public run(object: TSource): TDestination {
    const destinationObject = {} as TDestination;
    const destinationShape = new (this.destination.prototype as any).constructor();

    for (const key in destinationShape) {
      // console.log('destinationKey: ' + key);

      if (Object.keys(object).includes(key)) {
        if (this.actions.has(key)) {
          (destinationObject as any)[key] = this.actions.get(key)(object);
          continue;
        }

        (destinationObject as any)[key] = object[key];
        continue;
      }

      if (this.actions.has(key)) {
        (destinationObject as any)[key] = this.actions.get(key)(object);
      }
    }

    this.expantions.forEach((expandFrom, prefix) => {
      console.log(expandFrom, prefix);
      const keys = Object.keys(destinationShape)
        .filter((prop) => prop.startsWith(prefix))
        .map((prop) => prop.split(`${prefix}_`)[1]);

      console.log('KEYS', keys);

      const sourceObject = expandFrom(object);
      keys.forEach((key) => {
        if (Object.keys(sourceObject).includes(key)) {
          (destinationObject as any)[`${prefix}_${key}`] = sourceObject[key];
        }
      });
    });

    if (this.options.transformObjectToClassInstance) {
      return plainToClass(this.destination, destinationObject) as TDestination;
    }

    return destinationObject;
  }

  public forMember<A extends keyof TDestination>(
    destinationKey: keyof TDestination,
    mapFrom: (obj: TSource) => TDestination[A],
  ) {
    this.actions.set(destinationKey, mapFrom);
    return this;
  }

  public expand(prefix: string, expandFrom: (obj: TSource) => any) {
    this.expantions.set(prefix, expandFrom);
    return this;
  }
}

export default Shaping;
