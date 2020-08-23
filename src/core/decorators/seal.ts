import QueryHandler from '../@cqs/QueryHandler';
import { wow } from '.';

export function seal(
  target: QueryHandler,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<wow>,
) {
  descriptor.writable = false;
  descriptor.enumerable = false;
  descriptor.configurable = false;
}
