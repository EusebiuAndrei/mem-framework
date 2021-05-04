import {
  Command,
  CommandHandler,
  EventTransport,
  Handler,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../../../../infrastructure/repos/TaskRepository';
import EditTaskDto from './EditTaskDto';
import WorkTrackValueObject from '../../../../domain/WorkTrackValueObject';
import Task from '../../../../../../models/Task';
import RelationsUpdater from '../../../../../core/RelationsUpdater';
import WorkTrack from '../../../../../../models/ValueObjects/WorkTrack';

@Command()
export class EditTaskCommand extends EventTransport {
  id: number;
  task: EditTaskDto;
}

@injectable()
@CommandHandler(EditTaskCommand)
class CreateTaskHandler implements Handler<EditTaskCommand, any> {
  @inject(TaskRepository) private _taskRepo: TaskRepository;

  async handle(command: EditTaskCommand) {
    const { id, task: taskDto } = command;

    const task = await this._taskRepo.findOne({ id });

    if (taskDto.title) task.title = taskDto.title;
    if (taskDto.description) task.description = taskDto.description;

    if (taskDto.estimatedTime) {
      const workTrack = WorkTrackValueObject.createNew(taskDto.estimatedTime);
      task.completedTime = workTrack.completed;
      task.estimatedTime = workTrack.estimated;
      task.remainingTime = workTrack.remaining;
    } else if (taskDto.completedTime) {
      let workTrack = new WorkTrackValueObject(
        task.estimatedTime,
        task.completedTime,
        task.remainingTime,
      );
      workTrack = workTrack.addCompletedTime(taskDto.completedTime);

      task.completedTime = workTrack.completed;
      task.estimatedTime = workTrack.estimated;
      task.remainingTime = workTrack.remaining;
    }
    RelationsUpdater.replaceOneRelation<Task>(task, 'status', taskDto.statusId);
    RelationsUpdater.replaceOneRelation(task, 'priority', taskDto.priorityId);
    RelationsUpdater.replaceManyRelation(task, 'tags', taskDto.tagsIds);
    RelationsUpdater.replaceManyRelation(task, 'assignees', taskDto.assigneesIds);
    RelationsUpdater.replaceManyRelation(task, 'subTasks', taskDto.subTasksIds);
    RelationsUpdater.replaceOneRelation(task, 'iteration', taskDto.iterationId);
    RelationsUpdater.replaceOneRelation(task, 'epic', taskDto.epicId);

    await this._taskRepo.save(task);
  }
}

export default CreateTaskHandler;
