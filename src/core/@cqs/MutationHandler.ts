import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { MutationMethod } from '../types';
import CQHandler from './CQHandler';

class MutationHandler extends CQHandler<MutationMethod> {
  constructor() {
    super();
  }

  public handle<TContext, TInfo>(cqs: DecorateWithCQSProps<TContext, TInfo>): void {
    this.getExpandedProperties().forEach(({ name, descriptor: { value: mutation } }) => {
      const props = this.decoratorsPayload.get(name);
      const middlewares = [
        ...props.middlewares,
        decorateWithCQS(cqs),
        validator(props.schema, ValidationSource.ARGS),
      ];
      this.router[props.method](
        props.path,
        ...middlewares,
        asyncHandler(async (req: CQSRequest<TContext, TInfo>) => {
          const { args, ctx, info } = req.cqs;
          return mutation.call(this, args, ctx, info);
        }),
      );
    });
  }
}

export default MutationHandler;
