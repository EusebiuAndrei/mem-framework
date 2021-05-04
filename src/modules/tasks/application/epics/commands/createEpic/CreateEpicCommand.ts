import {
  Handler,
  CommandHandler,
  Command,
  EventTransport,
} from '../../../../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import EpicRepository from '../../../../infrastructure/repos/EpicRepository';
import RelationsUpdater from '../../../../../core/RelationsUpdater';

@Command()
export class CreateEpicCommand extends EventTransport {
  title: string;
  description: string;
  statusId: number;
  priorityId: number;
  projectId?: number;
  teamIds?: number[];
}

@injectable()
@CommandHandler(CreateEpicCommand)
class CreateEpicHandler implements Handler<CreateEpicCommand, any> {
  @inject(EpicRepository) private _epicRepo: EpicRepository;

  async handle(command: CreateEpicCommand) {
    const { title, description, statusId, priorityId, projectId, teamIds } = command;

    const epic = this._epicRepo.create({
      title,
      description,
      status: RelationsUpdater.getReplaceableOneRelationResult(statusId),
      priority: RelationsUpdater.getReplaceableOneRelationResult(priorityId),
      project: projectId ? RelationsUpdater.getReplaceableOneRelationResult(projectId) : null,
      team: teamIds ? RelationsUpdater.getReplaceableManyRelationResult(teamIds) : null,
    });

    const createdEpic = await this._epicRepo.save(epic);

    return createdEpic;
  }
}

export default CreateEpicHandler;
