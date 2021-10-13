import { BaseLauncher } from '../packages/core/ioc';
import Server from './Server';
import HelloIocProfiler from './modules/hello/IocProfiler';
import expressProfiler from '../packages/core/ioc/libraryProfilers/expressProfiler';
import ExpressServer from '../packages/core/express/ExpressServer';
import memProfiler from '../packages/core/ioc/libraryProfilers/memProfiler';
import path from 'path';

interface More {
  controllers: any[];
}

class Launcher extends BaseLauncher<More> {
  public async profile(): Promise<void> {
    await HelloIocProfiler.profile(this.container);

    await memProfiler(this, { rootDirectory: path.join(__dirname, 'modules') });
    await expressProfiler(this, Server, { rootDirectory: path.join(__dirname, 'controllers') });
  }

  public static async start(): Promise<void> {
    const launcher = new Launcher();
    await launcher.launch();
    await launcher.container.get<ExpressServer>(ExpressServer).listen();
  }
}

export default Launcher;
