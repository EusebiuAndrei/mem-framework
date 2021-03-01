import { BaseLauncher } from './packages/core/ioc';
import SomeService from './modules/SomeService';

class Launcher extends BaseLauncher {
  public async profile(): Promise<void> {
    this._container.bind<SomeService>(SomeService).to(SomeService);
  }
}

export default Launcher;
