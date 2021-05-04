import {
  Handler,
  CommandHandler,
  Command,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../../../../infrastructure/repos/TaskRepository';
import CreateTaskDto from './CreateTaskDto';
import StatusEnum from '../../../../../core/constants/StatusEnum';
import PriorityEnum from '../../../../../core/constants/PriorityEnum';
import WorkTrackValueObject from '../../../../domain/WorkTrackValueObject';

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

    const workTrack = WorkTrackValueObject.createNew(taskDto.estimatedTime);

    const task = this._taskRepo.create({
      title: taskDto.title,
      description: taskDto.description,
      estimatedTime: workTrack.estimated,
      remainingTime: workTrack.remaining,
      completedTime: 0,
      status: {
        id: StatusEnum.TO_DO,
      },
      priority: {
        id: taskDto.priorityId ?? PriorityEnum.LOW,
      },
    });

    // task.workTrack = workTrack;

    await this._taskRepo.save(task);

    return task;
  }
}

export default CreateTaskHandler;
