import { Constructor } from './types';

export function createKey(source: Constructor, destination: Constructor) {
  const sourceKey = source.constructor.name;
  const destinationKey = destination.constructor.name;

  return `${sourceKey}_${destinationKey}`;
}
