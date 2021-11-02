import { ControllersProfiler } from '../index';
import ExpressServer from '../../express/ExpressServer';
import BaseLauncher from '../BaseLauncher';
import { AutomaticRegistrationOptions } from '../types';
import { ServerNotExtendingExpressServerException } from '../../exceptions';

const expressProfiler = async (
  launcher: BaseLauncher,
  Server: any,
  options: AutomaticRegistrationOptions,
) => {
  const controllers = await ControllersProfiler.profile(launcher.container, options);
  launcher.controllers = controllers;

  const server = new Server(controllers);
  if (!(server instanceof ExpressServer)) {
    throw new ServerNotExtendingExpressServerException();
  }

  launcher.container.bind<ExpressServer>(ExpressServer).toDynamicValue(() => server);
};

export default expressProfiler;
