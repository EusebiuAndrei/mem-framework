import { Container } from 'inversify';
import UserRepository from './repos/UserRepository';
import { Connection } from 'typeorm';

class AccountsIocProfiler {
  static async profile(container: Container) {
    container
      .bind<UserRepository>(UserRepository)
      .toDynamicValue(() => container.get(Connection).getCustomRepository(UserRepository));
  }
}

export default AccountsIocProfiler;
