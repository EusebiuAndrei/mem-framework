import QueryHandler from './QueryHandler';
import { get, schema } from './decorators/';
import joiSchema from '../routes/v1/profile/schema';
import { SuccessResponse } from './ApiResponse';

class HelloQuery extends QueryHandler {
  constructor() {
    super();
  }

  @get('/hello')
  @schema(joiSchema.userId)
  public getHello(args: any, ctx: any, info: any): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloQuery;
