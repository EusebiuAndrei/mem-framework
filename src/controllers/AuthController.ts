import { Controller, Post, Use } from '../packages/core/decorators';
import { SuccessResponse } from '../packages/core/exceptions';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { MemMediator } from '../packages/mem-events';
import { LoginCommand } from '../modules/accounts/commands/LoginCommand';
import { RegisterCommand } from '../modules/accounts/commands/RegisterCommand';

@injectable()
@Controller('auth')
class AuthController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Post('login')
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._mediator.send(new LoginCommand({ email, password }));
    return new SuccessResponse('success', result);
  }

  @Post('register')
  public async register(req: Request, res: Response) {
    const result = await this._mediator.send(new RegisterCommand({ user: req.body }));
    return new SuccessResponse('success', result);
  }
}

export default AuthController;
