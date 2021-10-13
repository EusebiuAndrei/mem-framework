import { Container } from 'inversify';
import { getModules } from '../../helpers';
import { AutomaticRegistrationOptions } from '../types';

class ControllersProfiler {
  public static async profile(
    container: Container,
    options: AutomaticRegistrationOptions,
  ): Promise<any[]> {
    const modules = await getModules(options.rootDirectory, ControllersProfiler.check);

    const controllers = [];
    for (const module of modules) {
      const { default: Controller } = await import(module.path);
      container.bind<typeof Controller>(Controller).toSelf();
      controllers.push(container.get(Controller));
    }

    return controllers;
  }

  private static check(fileName: string) {
    const moduleNameUppercase = fileName.toUpperCase();
    return moduleNameUppercase.endsWith('CONTROLLER');
  }
}

export default ControllersProfiler;
