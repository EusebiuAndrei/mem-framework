import { Container } from 'inversify';
import path from 'path';
import { EventType, MemMediator, registerHandlers } from '../../mem-events';
import { getModules } from '../helpers';

class HandlersProfiler {
  public static async profile(container: Container): Promise<any[]> {
    const modulesDirPath = path.join(__dirname, '..', '..', '..', 'modules');
    const modules = await getModules(modulesDirPath, HandlersProfiler.check);

    const handlers = [];
    for (const module of modules) {
      const { default: Handler } = await import(module.path);
      container.bind<typeof Handler>(Handler).toSelf();
      handlers.push(container.get(Handler));
    }

    registerHandlers({
      emitter: container.get('ee'),
      mediator: container.get(MemMediator),
      handlers,
    });

    return handlers;
  }

  private static check(fileName: string) {
    const moduleNameUppercase = fileName.toUpperCase();
    return (
      moduleNameUppercase.endsWith(EventType.QUERY) ||
      moduleNameUppercase.endsWith(EventType.COMMAND) ||
      moduleNameUppercase.endsWith(EventType.EVENT)
    );
  }
}

export default HandlersProfiler;
