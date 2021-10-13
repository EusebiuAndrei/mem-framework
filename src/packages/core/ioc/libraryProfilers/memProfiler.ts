import { HandlersProfiler, MemEventsProfiler } from '../index';
import BaseLauncher from '../BaseLauncher';
import { AutomaticRegistrationOptions } from '../types';

const memProfiler = async (launcher: BaseLauncher, options: AutomaticRegistrationOptions) => {
  await MemEventsProfiler.profile(launcher.container);
  launcher.handlers = await HandlersProfiler.profile(launcher.container, options);
};

export default memProfiler;
