import BaseLauncher from './BaseLauncher';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

const typeormDbProfiler = async (launcher: BaseLauncher, options: ConnectionOptions) => {
  const connection = await createConnection(options);
  launcher.container.bind<Connection>(Connection).toDynamicValue(() => connection);
};

export default typeormDbProfiler;
