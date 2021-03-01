import { Controller, Get, Use, UseR, UseUniversal } from '../../../packages/core/decorators';
import { SuccessResponse } from '../../../packages/core/api/ApiResponse';
import bodyParser from 'body-parser';
import { GetHelloQuery } from '../queries/GetHelloQuery';
import { CreateHelloCommand } from '../commands/CreateHelloCommand';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../../../packages/mem-events';

const tryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('TRY Middleware');
  return next();
};

@injectable()
@UseUniversal(tryMiddleware)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  @UseR(tryMiddleware)
  public async getHello(req: Request, res: Response): Promise<SuccessResponse<any>> {
    const result = await this._mediator.emitAction(new GetHelloQuery(1));
    return new SuccessResponse('success', result);
  }

  // Full decorators usage example
  // @post('') // <=> @method('post') @path('/hello')
  // @use([bodyParser.json({ limit: '10mb' })])
  // @schema(Post)
  // public async postHello(req: Request, res: Response): Promise<SuccessResponse<any>> {
  //   // return new SuccessResponse('success', { args, ctx });
  //   const result = await this._mediator.emitAction(new CreateHelloCommand(1));
  //   return new SuccessResponse('success', result);
  // }
}

export default HelloController;
