import { Handler, CommandHandler, Command, EventTransport } from '../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../repos/TaskRepository';
import CreateTaskDto from '../dtos/CreateTaskDto';
import StatusEnum from '../../core/constants/StatusEnum';
import PriorityEnum from '../../core/constants/PriorityEnum';
import EditTaskDto from '../dtos/EditTaskDto';
import WorkTrackValueObject from '../domain/WorkTrackValueObject';
import Task from '../../../models/Task';
import RelationsUpdater from '../../core/RelationsUpdater';

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
    if (taskDto.completedTime) {
      const workTrack = new WorkTrackValueObject(
        task.workTrack.estimated,
        task.workTrack.completed,
        task.workTrack.remaining,
      );
      workTrack.addCompletedTime(taskDto.completedTime);
      task.workTrack = workTrack;
    }
    RelationsUpdater.replaceOneRelation<Task>(task, 'status', taskDto.statusId);
    RelationsUpdater.replaceOneRelation(task, 'priority', taskDto.priorityId);
    RelationsUpdater.replaceManyRelation(task, 'tags', taskDto.tagsIds);
    RelationsUpdater.replaceManyRelation(task, 'assignees', taskDto.assigneesIds);
    RelationsUpdater.replaceManyRelation(task, 'subTasks', taskDto.subTasksIds);
    RelationsUpdater.replaceOneRelation(task, 'iteration', taskDto.iterationId);
    RelationsUpdater.replaceOneRelation(task, 'epic', taskDto.epicId);

    await this._taskRepo.save(task);

    return task;
  }
}

export default CreateTaskHandler;
