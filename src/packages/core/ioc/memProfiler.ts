import { HandlersProfiler, MemEventsProfiler } from './index';
import BaseLauncher from './BaseLauncher';

const memProfiler = async (launcher: BaseLauncher) => {
  await MemEventsProfiler.profile(launcher.container);
  launcher.handlers = await HandlersProfiler.profile(launcher.container);
};

export default memProfiler;
