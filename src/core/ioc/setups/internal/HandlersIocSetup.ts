import { IocSetupWithRegistrationOptions } from './../../types';
import {
  EventType,
  Handler,
  MemEventEmitter,
  MemMediator,
  registerHandlers,
} from '../../../../mem-events';
import { getModules } from '../../../helpers';

const HandlersIocSetup: IocSetupWithRegistrationOptions<Promise<Array<Handler<any, any>>>> = async (
  container,
  options,
) => {
  const modules = await getModules(options.rootDirectory, check);

  const handlers = [];
  for (const module of modules) {
    const { default: Handler } = await import(module.path);
    container.bind<typeof Handler>(Handler).toSelf();
    handlers.push(container.get(Handler));
  }

  registerHandlers({
    emitter: container.get(MemEventEmitter),
    mediator: container.get(MemMediator),
    handlers,
  });

  return handlers as Array<Handler<any, any>>;
};

const check = (fileName: string) => {
  const moduleNameUppercase = fileName.toUpperCase();
  return (
    moduleNameUppercase.endsWith(EventType.QUERY) ||
    moduleNameUppercase.endsWith(EventType.COMMAND) ||
    moduleNameUppercase.endsWith(EventType.EVENT)
  );
};

export default HandlersIocSetup;
