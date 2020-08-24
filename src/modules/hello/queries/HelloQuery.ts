import QueryHandler from '../../../core/@cqs/QueryHandler';
import { get, schema } from '../../../core/decorators';
import { SuccessResponse } from '../../../core/ApiResponse';
import { userId, UserId } from '../schema';
import { TContext, TInfo } from '../../../types';
class HelloQuery extends QueryHandler {
  public resource = 'hello';

  constructor() {
    super();
  }

  @get('') // <=> @method('get') @path('/hello')
  @schema(userId)
  public getHello(args: UserId, ctx: TContext, info: TInfo): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloQuery;
