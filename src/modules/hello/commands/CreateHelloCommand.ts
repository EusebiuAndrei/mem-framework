import { Handler, CommandHandler, Command } from '../../../packages/mem-events';
import { injectable } from 'inversify';

@Command()
export class CreateHelloCommand {
  constructor(public readonly type: number) {}
}

@injectable()
@CommandHandler(CreateHelloCommand)
class CreateHelloCommandHandler implements Handler<CreateHelloCommand, any> {
  async handle(command: CreateHelloCommand) {
    console.log('Query Callback inside');
    console.log(command);
    return command;
  }
}

export default CreateHelloCommandHandler;
