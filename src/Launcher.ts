import { BaseLauncher } from './packages/core/ioc';
import Server from './Server';
import HelloIocProfiler from './modules/hello/IocProfiler';
import expressProfiler from './packages/core/ioc/expressProfiler';
import ExpressServer from './packages/core/express/ExpressServer';
import memProfiler from './packages/core/ioc/memProfiler';

interface More {
  controllers: any[];
}

class Launcher extends BaseLauncher<More> {
  public async profile(): Promise<void> {
    await HelloIocProfiler.profile(this.container);

    await memProfiler(this);
    await expressProfiler(this, Server);
  }

  public static async start(): Promise<void> {
    const launcher = new Launcher();
    await launcher.launch();
    await launcher.container.get<ExpressServer>(ExpressServer).listen();
  }
}

export default Launcher;
