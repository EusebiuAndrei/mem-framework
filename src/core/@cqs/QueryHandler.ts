import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { QueryMethods } from '../@cqs/cqs';
import CQHandler from './CQHandler';

class QueryHandler extends CQHandler<QueryMethods> {
  constructor() {
    super();
  }

  public handle(cqs: DecorateWithCQSProps): void {
    this.getExpandedProperties().forEach(({ name, descriptor: { value: query } }) => {
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
          return query.call(this, args, ctx, info);
        }),
      );
    });
  }
}

export default QueryHandler;
