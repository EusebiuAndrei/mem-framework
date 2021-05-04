import { Controller, Delete, Get, Post, Put, Use } from '../packages/core/decorators';
import { NotFoundError, SuccessResponse } from '../packages/core/exceptions';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../packages/mem-events';
import { CreateTaskCommand } from '../modules/tasks/application/tasks/commands/createTask/CreateTaskCommand';
import { authorizeMiddleware } from '../middlewares';
import { GetTaskQuery } from '../modules/tasks/application/tasks/queries/getTask/GetTaskQuery';
import { EditTaskCommand } from '../modules/tasks/application/tasks/commands/editTask/EditTaskCommand';
import { DeleteTaskCommand } from '../modules/tasks/application/tasks/commands/deleteTask/DeleteTaskCommand';

@injectable()
// @Use(authorizeMiddleware)
@Controller('tasks')
class TaskController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get(':id')
  public async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this._mediator.send(new GetTaskQuery({ id }));
      return new SuccessResponse('success', result);
    } catch (e) {
      return new NotFoundError();
    }
  }

  @Post()
  public async createTask(req: Request, res: Response) {
    await this._mediator.send(new CreateTaskCommand({ task: req.body }));
    return new SuccessResponse('success', {});
  }

  @Put(':id')
  public async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    await this._mediator.send(new EditTaskCommand({ id, task: req.body }));
    return new SuccessResponse('success', {});
  }

  @Delete(':id')
  public async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    await this._mediator.send(new DeleteTaskCommand({ id }));
    return new SuccessResponse('success', {});
  }
}

export default TaskController;
