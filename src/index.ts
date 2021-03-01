import 'reflect-metadata';
import Launcher from './Launcher';
import Server from './Server';

const main = async () => {
  const launcher = new Launcher();
  await launcher.launch();

  const expressServer = new Server(launcher._controllers);
  await expressServer.listen();
};

main();
