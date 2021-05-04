import { Controller, Delete, Get, Post, Put, Use } from '../packages/core/decorators';
import { NotFoundError, SuccessResponse } from '../packages/core/exceptions';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../packages/mem-events';
import { GetEpicQuery } from '../modules/tasks/application/epics/queries/getEpic/GetEpicQuery';
import { CreateEpicCommand } from '../modules/tasks/application/epics/commands/createEpic/CreateEpicCommand';
import { GetEpicsQuery } from '../modules/tasks/application/epics/queries/getEpics/GetEpicsQuery';

@injectable()
// @Use(authorizeMiddleware)
@Controller('epics')
class EpicController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async getEpics(req: Request, res: Response) {
    const { statusId, priorityId } = req.query;
    try {
      const result = await this._mediator.send(new GetEpicsQuery({ statusId, priorityId }));
      return new SuccessResponse('success', result);
    } catch (e) {
      return new NotFoundError();
    }
  }

  @Post()
  public async createEpic(req: Request, res: Response) {
    const result = await this._mediator.send(new CreateEpicCommand(req.body));
    return new SuccessResponse('success', result);
  }

  @Get(':id')
  public async getEpicById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this._mediator.send(new GetEpicQuery({ id }));
      return new SuccessResponse('success', result);
    } catch (e) {
      return new NotFoundError();
    }
  }
}

export default EpicController;
