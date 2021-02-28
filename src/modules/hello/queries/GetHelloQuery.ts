import { QueryHandler, Query, Handler, MemMediator } from '../../../packages/mem-events';
import { hooks } from '@feathersjs/hooks';
import { niceHook } from '../hooks';
import { inject, injectable } from 'inversify';
import SomeService from '../../SomeService';

@Query()
export class GetHelloQuery {
  constructor(public readonly type: number) {}
}

@injectable()
@QueryHandler(GetHelloQuery)
class GetHelloQueryHandler implements Handler<GetHelloQuery, any> {
  @inject(SomeService) private _someService: SomeService;

  @hooks([niceHook])
  async handle(query: GetHelloQuery) {
    console.log('Query Callback inside');
    console.log(query);
    return query;
  }
}

export default GetHelloQueryHandler;
