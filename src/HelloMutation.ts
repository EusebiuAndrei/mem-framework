import { post, schema } from './core/decorators/';
import joiSchema from './routes/v1/profile/schema';
import { SuccessResponse } from './core/ApiResponse';
import MutationHandler from './core/@cqs/MutationHandler';

class HelloMutation extends MutationHandler {
  constructor() {
    super();
  }

  @post('/hello')
  @schema(joiSchema.userId)
  public getHello(args: any, ctx: any, info: any): any {
    return new SuccessResponse('success', { args, ctx });
  }
}

export default HelloMutation;
