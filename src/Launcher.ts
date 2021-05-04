import { BaseLauncher } from './packages/core/ioc';
import Server from './Server';
import HelloIocProfiler from './modules/hello/IocProfiler';
import AccountsIocProfiler from './modules/accounts/IocProfiler';
import TasksIocProfiler from './modules/tasks/IocProfiler';
import { Connection, getConnectionOptions } from 'typeorm';
import PhotoRepository from './repos/PhotoRepository';
import expressProfiler from './packages/core/ioc/expressProfiler';
import ExpressServer from './packages/core/express/ExpressServer';
import memProfiler from './packages/core/ioc/memProfiler';
import typeormDbProfiler from './packages/core/ioc/typeormDbProfiler';
import models from './models';

interface More {
  controllers: any[];
}

class Launcher extends BaseLauncher<More> {
  public async profile(): Promise<void> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { entities: models });
    await typeormDbProfiler(this, connectionOptions);

    await AccountsIocProfiler.profile(this.container);
    await TasksIocProfiler.profile(this.container);

    this.container
      .bind<PhotoRepository>(PhotoRepository)
      .toDynamicValue(() => this.container.get(Connection).getCustomRepository(PhotoRepository));
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
