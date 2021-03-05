import { delay } from './utils';
import { QueryHandler, Query, EventHandler, getEventMetadata } from './decorators';
import MemRegistry from './MemRegistry';
import { HookContext, hooks, NextFunction } from '@feathersjs/hooks';
import { Handler } from './types';

@Query()
export class CoolQuery {
  constructor(public readonly avg: number) {}
}

const niceHook = async (context: HookContext, next: NextFunction) => {
  console.log('Hook on HappyHelloSayer');
  await next();
};

@QueryHandler(CoolQuery)
class CoolQueryHandler implements Handler<CoolQuery, any> {
  @hooks([niceHook])
  async handle(query: CoolQuery) {
    console.log('Query Callback inside');
    console.log(query);
    return query;
  }
}

@EventHandler(CoolQuery)
class CoolQueryEventHandler implements Handler<CoolQuery, string> {
  async handle(query: CoolQuery) {
    await delay(3000);
    console.log('Callback inside');
    console.log(query);
    return 'event';
  }
}

const some = new CoolQueryEventHandler();
const lala = getEventMetadata(some);
console.log('META', lala);

MemRegistry.create(
  new CoolQueryEventHandler(),
  new CoolQueryHandler(),
  new CoolQueryEventHandler(),
);

const main = async () => {
  const result = await MemRegistry.memMediator.emit(new CoolQuery(23));
  console.log('RESULT', result);
};

main();
