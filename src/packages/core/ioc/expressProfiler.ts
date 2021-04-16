import { ControllersProfiler } from './index';
import ExpressServer from '../express/ExpressServer';
import BaseLauncher from './BaseLauncher';

const expressProfiler = async (launcher: BaseLauncher, Server: any) => {
  const controllers = await ControllersProfiler.profile(launcher.container);
  launcher.props.controllers = controllers;

  launcher.container
    .bind<ExpressServer>(ExpressServer)
    .toDynamicValue(() => new Server(controllers));
};

export default expressProfiler;
