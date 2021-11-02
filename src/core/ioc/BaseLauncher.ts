import { Container } from 'inversify';
import { Handler } from '../../mem-events';

// create a chain of profilers to give to base launcher and made it run accordingly
/**
 * The class that hold Dependency Injection work
 * It reminds all the handlers and controllers that were automatically injected
 */
abstract class BaseLauncher {
  public abstract setup(): Promise<void>;

  private readonly _container: Container = null;
  private _handlers: Array<Handler<any, any>> = [];
  private _controllers: Array<any> = [];

  constructor() {
    this._container = new Container();
  }

  async launch() {
    await this.setup();
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

  public get controllers(): Array<any> {
    return this._controllers;
  }

  public set controllers(controllers: Array<any>) {
    this._controllers = controllers;
  }
}

export default BaseLauncher;
