import { Container } from 'inversify';
import path from 'path';
import getModules from '../helpers/getModules';

class ControllersProfiler {
  public static async profile(container: Container): Promise<any[]> {
    const modulesDirPath = path.join(__dirname, '..', '..', '..', 'modules');
    const modules = await getModules(modulesDirPath, ControllersProfiler.check);

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
