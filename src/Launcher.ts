import { BaseLauncher } from './packages/core/ioc';
import Server from './Server';
import HelloIocProfiler from './modules/hello/IocProfiler';

class Launcher extends BaseLauncher {
  public async profile(): Promise<void> {
    await HelloIocProfiler.profile(this._container);
  }

  public async onEnd(): Promise<void> {
    this._container.bind<Server>(Server).toDynamicValue(() => new Server(this._controllers));
  }

  public static async start(): Promise<void> {
    const launcher = new Launcher();
    await launcher.launch();
    await launcher._container.get<Server>(Server).listen();
  }
}

export default Launcher;
