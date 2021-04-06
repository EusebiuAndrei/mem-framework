import { BaseLauncher } from './packages/core/ioc';
import Server from './Server';
import HelloIocProfiler from './modules/hello/IocProfiler';
import { Connection, createConnection, Repository } from 'typeorm';
import Photo from './models/Photo';
import PhotoRepository from './repos/PhotoRepository';

class Launcher extends BaseLauncher {
  public async profile(): Promise<void> {
    await HelloIocProfiler.profile(this._container);
  }

  public async onStart(): Promise<void> {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'seb9913',
        database: 'projecto',
        entities: [Photo],
        synchronize: true,
        logging: false,
      });

      this._container.bind<Connection>(Connection).toDynamicValue(() => connection);

      this._container
        .bind<PhotoRepository>(PhotoRepository)
        .toDynamicValue(() => connection.getCustomRepository(PhotoRepository));
    } catch (err) {
      console.log("Couldn't connect the db");
    }
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
