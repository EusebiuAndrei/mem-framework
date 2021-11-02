import { LauncherNotExtendingBaseLauncherException } from '../exceptions';
import { ExpressServer } from '../express';
import BaseLauncher from './BaseLauncher';

const startApp = async (Launcher: any) => {
  const launcher = new Launcher();

  if (!(launcher instanceof BaseLauncher)) {
    throw new LauncherNotExtendingBaseLauncherException();
  }

  await launcher.launch();
  await launcher.container.get<ExpressServer>(ExpressServer).listen();
};

export default startApp;
