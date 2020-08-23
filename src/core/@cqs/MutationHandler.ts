import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { MutationMethods } from '../@cqs/cqs';
import CQHandler from './CQHandler';

class MutationHandler extends CQHandler<MutationMethods> {
  constructor() {
    super();
  }

  public handle(cqs: DecorateWithCQSProps): void {
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
        asyncHandler(async (req: CQSRequest) => {
          const { args, ctx, info } = req.cqs;
          return mutation.call(this, args, ctx, info);
        }),
      );
    });
  }
}

export default MutationHandler;
