import { HookContext, NextFunction } from '@feathersjs/hooks';

const niceHook = async (context: HookContext, next: NextFunction) => {
  console.log('Hook on HappyHelloSayer');
  await next();
};

export default niceHook;