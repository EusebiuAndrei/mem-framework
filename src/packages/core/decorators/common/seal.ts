import { CQMethod } from '../../types';
import BaseController from '../../@cqs/BaseController';

export function seal(
  target: BaseController,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<CQMethod>,
) {
  descriptor.writable = false;
  descriptor.enumerable = false;
  descriptor.configurable = false;
}
