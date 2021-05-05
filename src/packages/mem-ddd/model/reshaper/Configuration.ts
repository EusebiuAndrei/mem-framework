import { ObjectLiteral } from '../../types';
import { ReshaperParties } from './types';
import { createKey } from './utils';
import Shaping, { ShapingOptions } from './Shaping';

class Configuration {
  public registry = new Map<string, Shaping<ObjectLiteral, ObjectLiteral>>();

  public createMap<TSource extends ObjectLiteral, TDestination extends ObjectLiteral>(
    { source, destination }: ReshaperParties,
    options?: ShapingOptions,
  ) {
    const key = createKey(source, destination);
    const mapping = new Shaping<TSource, TDestination>(source, destination, options);

    this.registry.set(key, (mapping as unknown) as Shaping<ObjectLiteral, ObjectLiteral>);

    return mapping;
  }
}

export default Configuration;
