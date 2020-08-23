import { post, schema, use } from '../../core/decorators';
import joiSchema from '../../routes/v1/profile/schema';
import { SuccessResponse } from '../../core/ApiResponse';
import MutationHandler from '../../core/@cqs/MutationHandler';
import bodyParser from 'body-parser';

class HelloMutation extends MutationHandler {
  constructor() {
    super();
  }

  // Full decorators usage example
  @post('/hello') // <=> @method('post') @path('/hello')
  @use(bodyParser.json({ limit: '10mb' }))
  @schema(joiSchema.userId)
  public getHello(args: any, ctx: any, info: any): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloMutation;
