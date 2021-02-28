import { injectable } from 'inversify';

@injectable()
class SomeService {
  public getSome() {
    console.log('\nSOME\n');
    return 'some';
  }
}

export default SomeService;