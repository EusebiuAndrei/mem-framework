import { QueryHandler, Query, Handler } from '../../../packages/mem-events';
import { injectable } from 'inversify';

@Query()
export class CreateHelloCommand {
  constructor(public readonly type: number) {}
}

@QueryHandler(CreateHelloCommand)
@injectable()
class CreateHelloCommandHandler implements Handler<CreateHelloCommand, any> {
  async handle(command: CreateHelloCommand) {
    console.log('Query Callback inside');
    console.log(command);
    return command;
  }
}

export default CreateHelloCommandHandler;
