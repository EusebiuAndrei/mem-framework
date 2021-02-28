import { Container } from 'inversify';
import path from 'path';
import EventType from '../../mem-events/EventType';
import { MemMediator } from '../../mem-events';
import getModules from '../helpers/getModules';

class HandlersProfiler {
  public static async profile(container: Container): Promise<void> {
    const modulesDirPath = path.join(__dirname, '..', '..', '..', 'modules');
    const modules = await getModules(modulesDirPath, HandlersProfiler.check);

    const handlers = [];
    for (const module of modules) {
      const { default: Handler } = await import(module.path);
      container.bind<typeof Handler>(Handler).toSelf();
      handlers.push(container.get(Handler));
    }

    HandlersProfiler.registerHandlers(container, handlers);
  }

  private static check(fileName: string) {
    const moduleNameUppercase = fileName.toUpperCase();
    return (
      moduleNameUppercase.endsWith(EventType.QUERY) ||
      moduleNameUppercase.endsWith(EventType.COMMAND) ||
      moduleNameUppercase.endsWith(EventType.EVENT)
    );
  }

  private static registerHandlers(container: Container, handlers: any[]) {
    handlers.forEach((handler) => {
      const meta = Reflect.get(handler, 'meta');
      const callback = handler.handle.bind(handler);

      if (meta.scope === EventType.EVENT) {
        (container.get('ee') as any).on(meta.event.name, callback);
      } else {
        (container.get(MemMediator) as any).on(meta.event.name, callback);
      }
    });
  }
}

export default HandlersProfiler;
