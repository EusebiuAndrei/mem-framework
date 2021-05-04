import { Controller, Get, Use } from '../packages/core/decorators';
import { SuccessResponse } from '../packages/core/exceptions';
import { GetHelloQuery } from '../modules/hello/queries/GetHelloQuery';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../packages/mem-events';
import { authorizeMiddleware, tryMiddleware } from '../middlewares';
import PhotoRepository from '../repos/PhotoRepository';

@injectable()
@Use(authorizeMiddleware, tryMiddleware)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;
  @inject(PhotoRepository) private _photoRepo: PhotoRepository;

  @Get('gigi')
  public async getHello(req: Request, res: Response): Promise<SuccessResponse<any>> {
    const a = await this._photoRepo.find();
    console.log(a);
    const result = await this._mediator.send(new GetHelloQuery({ type: 1 }));
    return new SuccessResponse('success', result);
  }
}

export default HelloController;
