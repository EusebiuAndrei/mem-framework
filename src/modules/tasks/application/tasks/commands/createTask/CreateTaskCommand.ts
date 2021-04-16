import { Handler, CommandHandler, Command, EventTransport } from '../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../repos/TaskRepository';
import CreateTaskDto from '../dtos/CreateTaskDto';
import StatusEnum from '../../core/constants/StatusEnum';
import PriorityEnum from '../../core/constants/PriorityEnum';

@Command()
export class CreateTaskCommand extends EventTransport {
  task: CreateTaskDto;
}

@injectable()
@CommandHandler(CreateTaskCommand)
class CreateTaskHandler implements Handler<CreateTaskCommand, any> {
  @inject(TaskRepository) private _taskRepo: TaskRepository;

  async handle(command: CreateTaskCommand) {
    const { task: taskDto } = command;

    const workTrack = {
      estimated: taskDto.estimatedTime,
      remaining: taskDto.estimatedTime,
      completed: 0,
    };

    const task = this._taskRepo.create({
      title: taskDto.title,
      description: taskDto.description,
      workTrack,
      status: {
        id: taskDto.statusId ?? StatusEnum.TO_DO,
      },
      priority: {
        id: taskDto.priorityId ?? PriorityEnum.LOW,
      },
    });

    await this._taskRepo.save(task);

    return task;
  }
}

export default CreateTaskHandler;
