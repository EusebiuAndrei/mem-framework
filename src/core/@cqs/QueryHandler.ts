import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { QueryMethod } from '../types';
import CQHandler from './CQHandler';

class QueryHandler extends CQHandler<QueryMethod> {
  constructor() {
    super();
  }

  public handle<TContext, TInfo>(cqs: DecorateWithCQSProps<TContext, TInfo>): void {
    this.getExpandedProperties().forEach(({ name, descriptor: { value: query } }) => {
      const props = this.decoratorsPayload.get(name);
      const middlewares = [
        ...props.middlewares,
        decorateWithCQS(cqs),
        validator<TContext, TInfo>(props.schema, ValidationSource.ARGS),
      ];
      this.router[props.method](
        props.path,
        ...middlewares,
        asyncHandler(async (req: CQSRequest<TContext, TInfo>) => {
          const { args, ctx, info } = req.cqs;
          return query.call(this, args, ctx, info);
        }),
      );
    });
  }

  // Implement caching
}

export default QueryHandler;
