import { QueryHandler, Query, Handler, EventTransport } from '../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../../../infrastructure/repos/TaskRepository';

@Query()
export class GetTaskQuery extends EventTransport {
  public readonly id: number;
}

@injectable()
@QueryHandler(GetTaskQuery)
class GetTaskQueryHandler implements Handler<GetTaskQuery, any> {
  @inject(TaskRepository) private _taskRepo: TaskRepository;

  async handle(query: GetTaskQuery) {
    const { id } = query;
    const result = await this._taskRepo.findOne(
      { id },
      { relations: ['status', 'priority', 'tags', 'assignees', 'subTasks', 'iteration', 'epic'] },
    );
    return result;
  }
}

export default GetTaskQueryHandler;
