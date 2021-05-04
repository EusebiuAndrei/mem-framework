import {
  QueryHandler,
  Query,
  Handler,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import EpicRepository from '../../../../infrastructure/repos/EpicRepository';

@Query()
export class GetEpicsQuery extends EventTransport {
  public readonly statusId?: number;
  public readonly priorityId?: number;
}

@injectable()
@QueryHandler(GetEpicsQuery)
class GetEpicsQueryHandler implements Handler<GetEpicsQuery, any> {
  @inject(EpicRepository) private _epicRepo: EpicRepository;

  async handle(query: GetEpicsQuery) {
    const { statusId, priorityId } = query;

    const conditions = {} as any;
    if (statusId) conditions.status = { id: statusId };
    if (priorityId) conditions.priority = { id: priorityId };

    const epics = await this._epicRepo.find({
      where: conditions,
      relations: ['status', 'priority', 'project', 'tasks', 'team'],
    });

    if (!epics.length) {
      throw new Error(`There are no epics of that condition`);
    }

    return epics;
  }
}

export default GetEpicsQueryHandler;
