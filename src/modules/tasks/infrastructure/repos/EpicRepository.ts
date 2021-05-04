import { Connection, DeepPartial, EntityRepository, Repository, SaveOptions } from 'typeorm';
import Epic from '../../../../models/Epic';
import { inject, injectable } from 'inversify';
import { BaseRepo } from '../../../../packages/mem-ddd/model/BaseRepo';
import { Entity } from '../../../../packages/mem-ddd';
import { EntityTarget } from 'typeorm/common/EntityTarget';

@EntityRepository(Epic)
class EpicRepository extends Repository<Epic> {}

export default EpicRepository;

class ReshaperRegistry {}

@injectable()
class TypeOrmRepo<TEntity, TModel> extends BaseRepo<TEntity, TModel> {
  @inject(Connection) private _connection: Connection;
  private target: EntityTarget<TModel>;

  constructor(target: EntityTarget<TModel>) {
    super();
  }

  async exists(t: TEntity): Promise<boolean> {
    return false;
  }

  async save(t: TEntity): Promise<any> {
    // return Promise.resolve(undefined);
    this._connection.getRepository(this.target);
    return;
    return Promise.resolve(false);
  }
}
