import QueryHandler from '../../../core/@cqs/QueryHandler';
import { get, schema } from '../../../core/decorators';
import { SuccessResponse } from '../../../core/api/ApiResponse';
import { GetHelloArgs, HelloQuery as IHelloQuery } from '../types/HelloTypes';
import { Context } from '../../../types';
import { Info } from '../../../core/@cqs/types';
//
class HelloQuery extends QueryHandler implements IHelloQuery {
  public resource = 'hello';

  constructor() {
    super();
  }

  @get('') // <=> @method('get') @path('/hello')
  @schema(GetHelloArgs)
  public getHello(
    args: GetHelloArgs,
    ctx: Context,
    info: Info,
  ): SuccessResponse<{ args: GetHelloArgs; ctx: Context }> {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloQuery;
