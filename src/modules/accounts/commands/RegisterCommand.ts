import { Handler, CommandHandler, Command, EventTransport } from '../../../packages/mem-events';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repos/UserRepository';
import User from '../../../models/User';
import { SuccessResponse } from '../../../packages/core/exceptions/api';
import RegisterUserDto from '../dtos/RegisterUserDto';

@Command()
export class RegisterCommand extends EventTransport {
  user: RegisterUserDto;
}

@injectable()
@CommandHandler(RegisterCommand)
class RegisterCommandHandler implements Handler<RegisterCommand, any> {
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: RegisterCommand) {
    const {
      user: { email, password },
    } = command;

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 8);

    await this._userRepo.save(user);
    const token = jwt.sign({ id: user.id }, 'MY_SECRET', { expiresIn: 10000000 });
    return new SuccessResponse('success', { user, token });
  }
}

export default RegisterCommandHandler;
