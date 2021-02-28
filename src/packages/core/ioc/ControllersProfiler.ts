import { Container } from 'inversify';
import path from 'path';
import getModules from '../helpers/getModules';

class ControllersProfiler {
  public static async profile(container: Container): Promise<void> {
    const modulesDirPath = path.join(__dirname, '..', '..', '..', 'modules');
    const modules = await getModules(modulesDirPath, ControllersProfiler.check);

    const handlers = [];
    for (const module of modules) {
      const { default: Controller } = await import(module.path);
      container.bind<typeof Controller>(Controller).toSelf();
      handlers.push(container.get(Controller));
    }
  }

  private static check(fileName: string) {
    const moduleNameUppercase = fileName.toUpperCase();
    return moduleNameUppercase.endsWith('CONTROLLER');
  }
}

export default ControllersProfiler;
