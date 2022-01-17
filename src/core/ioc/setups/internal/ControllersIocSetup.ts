import { IocSetupWithRegistrationOptions } from './../../types';
import { getModules } from '../../../helpers';

const ControllersIocSetup: IocSetupWithRegistrationOptions<Promise<any[]>> = async (
  container,
  options,
) => {
  const modules = await getModules(options.rootDirectory, check);

  const controllers = [];
  for (const module of modules) {
    const { default: Controller } = await import(module.path);
    container.bind<typeof Controller>(Controller).toSelf();
    controllers.push(container.get(Controller));
  }

  return controllers;
};

const check = (fileName: string) => {
  const moduleNameUppercase = fileName.toUpperCase();
  return moduleNameUppercase.endsWith('CONTROLLER');
};

export default ControllersIocSetup;
