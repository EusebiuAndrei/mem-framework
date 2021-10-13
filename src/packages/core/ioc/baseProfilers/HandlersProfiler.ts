import { Container } from 'inversify';
import { EventType, Handler, MemMediator, registerHandlers } from '../../../mem-events';
import { getModules } from '../../helpers';
import { AutomaticRegistrationOptions } from '../types';

class HandlersProfiler {
  public static async profile(
    container: Container,
    options: AutomaticRegistrationOptions,
  ): Promise<any[]> {
    const modules = await getModules(options.rootDirectory, HandlersProfiler.check);

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

    return handlers as Array<Handler<any, any>>;
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
