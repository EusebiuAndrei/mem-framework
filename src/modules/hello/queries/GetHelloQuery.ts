import { QueryHandler, Query, Handler } from '../../../packages/mem-events';
import { hooks } from '@feathersjs/hooks';
import { niceHook } from '../hooks';
import { inject, injectable } from 'inversify';
import { HelloRepo } from '../repos';

@Query()
export class GetHelloQuery {
  constructor(public readonly type: number) {}
}

@injectable()
@QueryHandler(GetHelloQuery)
class GetHelloQueryHandler implements Handler<GetHelloQuery, any> {
  @inject(HelloRepo) private _helloRepo: HelloRepo;

  @hooks([niceHook])
  async handle(query: GetHelloQuery) {
    console.log('Query Callback inside');
    console.log(query);

    const result = await this._helloRepo.find();
    return result;
  }
}

export default GetHelloQueryHandler;
