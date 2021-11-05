import { ReshaperParties } from './types';
import { ObjectLiteral } from '../../types';
import { createKey } from './utils';
import Configuration from './Configuration';
import Shaping from './Shaping';

class Reshaper {
  private readonly configuration: Configuration;

  constructor(config: (configuration: Configuration) => void) {
    this.configuration = new Configuration();
    config(this.configuration);
  }

  public reshape<TSource extends ObjectLiteral, TDestination extends ObjectLiteral>(
    { source, destination }: ReshaperParties,
    object: TSource,
  ) {
    const key = createKey(source, destination);
    const mapping = (this.configuration.registry.get(key) as unknown) as Shaping<
      TSource,
      TDestination
    >;

    return mapping.run(object);
  }
}

export default Reshaper;
