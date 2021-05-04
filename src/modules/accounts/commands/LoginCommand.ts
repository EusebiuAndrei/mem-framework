import { Handler, CommandHandler, Command, EventTransport } from '../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repos/UserRepository';

@Command()
export class LoginCommand extends EventTransport {
  email: string;
  password: string;
}

@injectable()
@CommandHandler(LoginCommand)
class LoginCommandHandler implements Handler<LoginCommand, any> {
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: LoginCommand) {
    console.log('COMMAND Callback inside');
    console.log(command);

    const { email, password } = command;
    const user = await this._userRepo.findOne({ email });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ id: user.id }, 'MY_SECRET', { expiresIn: 10000000 });

    return { user, token };

    // return new SuccessResponse('success', { user, token });
  }
}

export default LoginCommandHandler;
