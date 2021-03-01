import { Container } from 'inversify';
import { ControllersProfiler, HandlersProfiler, MemEventsProfiler } from './index';

abstract class BaseLauncher {
  public _container = new Container();
  public abstract async profile(): Promise<void>;

  async launch() {
    await this.profile();

    await MemEventsProfiler.profile(this._container);
    await HandlersProfiler.profile(this._container);
    await ControllersProfiler.profile(this._container);
  }
}

export default BaseLauncher;
