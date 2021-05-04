import {
  QueryHandler,
  Query,
  Handler,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import EpicRepository from '../../../../infrastructure/repos/EpicRepository';

@Query()
export class GetEpicQuery extends EventTransport {
  public readonly id: number;
}

@injectable()
@QueryHandler(GetEpicQuery)
class GetEpicQueryHandler implements Handler<GetEpicQuery, any> {
  @inject(EpicRepository) private _epicRepo: EpicRepository;

  async handle(query: GetEpicQuery) {
    const { id } = query;
    const epic = await this._epicRepo.findOne(
      { id },
      {
        relations: ['status', 'priority', 'project', 'tasks', 'team'],
      },
    );

    if (!epic) {
      throw new Error(`There isn't an epic with id ${id}`);
    }

    return epic;
  }
}

export default GetEpicQueryHandler;
