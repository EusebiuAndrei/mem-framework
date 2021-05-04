import {
  Handler,
  CommandHandler,
  Command,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../../../../infrastructure/repos/TaskRepository';

@Command()
export class DeleteTaskCommand extends EventTransport {
  id: number;
}

@injectable()
@CommandHandler(DeleteTaskCommand)
class DeleteTaskHandler implements Handler<DeleteTaskCommand, any> {
  @inject(TaskRepository) private _taskRepo: TaskRepository;

  async handle(command: DeleteTaskCommand) {
    const { id } = command;

    await this._taskRepo.delete({ id });
  }
}

export default DeleteTaskHandler;
