import { Container } from 'inversify';
import { ControllersProfiler, HandlersProfiler, MemEventsProfiler } from './index';

abstract class BaseLauncher {
  public abstract async profile(): Promise<void>;

  protected _container = new Container();
  protected _handlers: any[] = [];
  protected _controllers: any[] = [];

  async launch() {
    await this.onStart();
    await this.profile();
    await this.onMem();
    await this.onEnd();
  }

  async onStart(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async onEnd(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async onMem() {
    await MemEventsProfiler.profile(this._container);
    this._handlers = await HandlersProfiler.profile(this._container);
    this._controllers = await ControllersProfiler.profile(this._container);
  }
}

export default BaseLauncher;
