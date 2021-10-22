import { Controller, Get, Use } from '../../packages/core/decorators';
import { Ok, BadRequestException } from '../../packages/core/exceptions';
import { GetHelloQuery } from '../modules/hello/queries/GetHelloQuery';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { createEvent, MemMediator } from '../../packages/mem-events';
import { tryMiddleware } from '../middlewares';

@injectable()
@Use(tryMiddleware)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async getHello(req: Request, res: Response): Promise<Ok> {
    const result = await this._mediator.send(createEvent(GetHelloQuery, { type: 1 }));
    // throw new Error('some');
    // throw new BadRequestException();
    return new Ok(result);
  }
}

export default HelloController;
