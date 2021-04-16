import {
  QueryHandler,
  Query,
  Handler,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import TaskRepository from '../../../../infrastructure/repos/TaskRepository';

@Query()
export class GetEpicQuery extends EventTransport {
  public readonly id: number;
}

@injectable()
@QueryHandler(GetEpicQuery)
class GetEpicQueryHandler implements Handler<GetEpicQuery, any> {
  @inject(TaskRepository) private _taskRepo: TaskRepository;

  async handle(query: GetEpicQuery) {
    const { id } = query;
    const result = await this._taskRepo.findOne(
      { id },
      {
        relations: ['status', 'priority', 'tags', 'assignees', 'subTasks', 'iteration', 'epic'],
      },
    );

    if (!result) {
      throw new Error(`There isn't an epic with id ${id}`);
    }

    return result;
  }
}

export default GetEpicQueryHandler;
