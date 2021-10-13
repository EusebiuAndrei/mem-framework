import { injectable } from 'inversify';

@injectable()
class HelloRepo {
  public async find(): Promise<string[]> {
    return ['hello', 'hi'];
  }
}

export default HelloRepo;
