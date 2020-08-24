import QueryHandler from '../../@cqs/QueryHandler';
import { CQMethod } from '../../types';

export function seal(
  target: QueryHandler,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<CQMethod>,
) {
  descriptor.writable = false;
  descriptor.enumerable = false;
  descriptor.configurable = false;
}
