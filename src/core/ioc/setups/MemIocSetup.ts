import { HandlersIocSetup, MemEventsIocSetup } from './internal';
import BaseLauncher from '../BaseLauncher';
import { AutomaticRegistrationOptions } from '../types';

const MemIocSetup = async (launcher: BaseLauncher, options: AutomaticRegistrationOptions) => {
  await MemEventsIocSetup(launcher.container);
  launcher.handlers = await HandlersIocSetup(launcher.container, options);
};

export default MemIocSetup;
