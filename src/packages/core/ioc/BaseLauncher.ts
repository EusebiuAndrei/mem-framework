import { Container } from 'inversify';
import { Handler } from '../../mem-events';

// create a chain of profilers to give to base launcher and made it run accordingly
abstract class BaseLauncher<T = Record<string, any>> {
  public abstract profile(): Promise<void>;

  private readonly _container: Container = null;
  private _handlers: Array<Handler<any, any>> = [];
  public props = {} as T;

  constructor() {
    this._container = new Container();
  }

  async launch() {
    await this.profile();
  }

  public get container(): Container {
    return this._container;
  }

  public get handlers(): Array<Handler<any, any>> {
    return this._handlers;
  }

  public set handlers(handlers: Array<Handler<any, any>>) {
    this._handlers = handlers;
  }
}

export default BaseLauncher;
