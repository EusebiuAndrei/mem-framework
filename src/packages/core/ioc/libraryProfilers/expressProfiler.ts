import { ControllersProfiler } from '../index';
import ExpressServer from '../../express/ExpressServer';
import BaseLauncher from '../BaseLauncher';
import { AutomaticRegistrationOptions } from '../types';

const expressProfiler = async (
  launcher: BaseLauncher,
  Server: any,
  options: AutomaticRegistrationOptions,
) => {
  const controllers = await ControllersProfiler.profile(launcher.container, options);
  launcher.props.controllers = controllers;

  launcher.container
    .bind<ExpressServer>(ExpressServer)
    .toDynamicValue(() => new Server(controllers));
};

export default expressProfiler;
