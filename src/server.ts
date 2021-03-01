import 'reflect-metadata';
import CQServer from './packages/core/@cqs/CQServer';
import { TContext } from './types';
import { GetHelloQuery } from './modules/hello/queries/GetHelloQuery';
import { BaseLauncher } from './packages/core/ioc';
import SomeService from './modules/SomeService';
import HelloController from './modules/hello/controllers/HelloController';
import { MemMediator } from './packages/mem-events';

class Launcher extends BaseLauncher {
  public async profile(): Promise<void> {
    this._container.bind<SomeService>(SomeService).to(SomeService);
  }
}

const launcher = new Launcher();

const main = async () => {
  await launcher.launch();
  const result = await launcher._container.get(MemMediator).sendAction(new GetHelloQuery(1));
  console.log('RESULT', result);

  const cqServer = new CQServer<TContext>({
    controllers: [launcher._container.get(HelloController)],
  });

  await cqServer.listen();
};

main();
