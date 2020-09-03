import QueryHandler from '../../../core/@cqs/QueryHandler';
import { get, schema } from '../../../core/decorators';
import { SuccessResponse } from '../../../core/api/ApiResponse';
import { userId, UserId, Post } from '../schema';
import { TContext, TInfo } from '../../../types';
class HelloQuery extends QueryHandler {
  public resource = 'hello';

  constructor() {
    super();
  }

  @get('') // <=> @method('get') @path('/hello')
  @schema<Post>(Post)
  public getHello(args: Post, ctx: TContext, info: TInfo): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloQuery;
