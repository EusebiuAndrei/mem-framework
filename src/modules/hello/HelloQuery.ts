import QueryHandler from '../../core/@cqs/QueryHandler';
import { get, schema } from '../../core/decorators';
import joiSchema from '../../routes/v1/profile/schema';
import { SuccessResponse } from '../../core/ApiResponse';

class HelloQuery extends QueryHandler {
  constructor() {
    super();
  }

  @get('/hello') // <=> @method('get') @path('/hello')
  @schema(joiSchema.userId)
  public getHello(args: any, ctx: any, info: any): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloQuery;
