import { Controller, Get, Use } from '../packages/core/decorators';
import { SuccessResponse } from '../packages/core/exceptions';
// import bodyParser from 'body-parser';
import { GetHelloQuery } from '../modules/hello/queries/GetHelloQuery';
// import { CreateHelloCommand } from '../modules/hello/commands/CreateHelloCommand';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../packages/mem-events';
import { tryMiddleware } from '../middlewares';
import PhotoRepository from '../repos/PhotoRepository';

@injectable()
@Use(tryMiddleware)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;
  @inject(PhotoRepository) private _photoRepo: PhotoRepository;

  @Use(tryMiddleware)
  @Get()
  public async getHello(req: Request, res: Response): Promise<SuccessResponse<any>> {
    const a = await this._photoRepo.find();
    console.log(a);
    const result = await this._mediator.send(new GetHelloQuery({ type: 1 }));
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
