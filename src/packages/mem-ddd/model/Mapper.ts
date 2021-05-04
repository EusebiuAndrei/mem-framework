import { Entity } from './Entity';
import { ObjectLiteral } from '../types';

class MapperRegistry {
  private registry = new Map<string, Mapper<any, any>>();

  public getMap<TEntity extends Entity<any>, TModel extends ObjectLiteral>(object: ObjectLiteral) {
    const key = object.constructor.name;
    const mapper = this.registry.get(key) as Mapper<TEntity, TModel>;

    return mapper;
  }

  public createMapper<TEntity extends Entity<any>, TModel extends ObjectLiteral>() {}
}

export interface Mapper<TEntity extends Entity<any>, TModel extends ObjectLiteral> {
  toDomain(model: TModel): TEntity;
  toPersistance(entity: TEntity): TModel;
}

export default MapperRegistry;
