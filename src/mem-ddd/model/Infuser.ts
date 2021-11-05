import DomainEvents, {
  feedDomainEventsFromEntities,
  feedDomainEventsFromEntity,
} from './DomainEvents';
import { inject, injectable } from 'inversify';
import { Entity } from './Entity';
// import MapperRegistry from './Mapper';
import { ObjectLiteral } from '../types';

Reshaper.shapes<User, UserDto>(new User(), new UserDto());

@injectable()
export abstract class Infuser<TEntity extends Entity<any>, TModel extends ObjectLiteral> {
  @inject(DomainEvents) private _domainEvents: DomainEvents;
  @inject('MapperRegistry') private _mapperRegistry: any; // MapperRegistry;

  public async read(fetcher: Promise<TModel>): Promise<TEntity> {
    const entity = await fetcher;

    // persistence to domain
    // @ts-ignore
    return this._mapperRegistry.getMap<TEntity, TModel>(entity).toDomain(entity);
  }

  public async readMany(fetcher: Promise<TModel[]>): Promise<TEntity[]> {
    const entities = await fetcher;

    // persistence to domain
    return entities.map((entity) =>
      // @ts-ignore
      this._mapperRegistry.getMap<TEntity, TModel>(entity).toDomain(entity),
    );
  }

  public async mutate(
    domainEntity: TEntity,
    updater: (entity: TModel) => Promise<TModel>,
  ): Promise<TEntity> {
    // domain to persistence
    // @ts-ignore
    const entity = this._mapperRegistry
      .getMap<TEntity, TModel>(domainEntity)
      .toPersistance(domainEntity);

    await updater(entity);

    await feedDomainEventsFromEntity(this._domainEvents, domainEntity);

    return domainEntity;
  }

  public async mutateMany(
    domainEntities: TEntity[],
    updater: (entity: TModel[]) => Promise<TModel[]>,
  ): Promise<TEntity[]> {
    // domain to persistence
    const entities = domainEntities.map((domainEntity) =>
      // @ts-ignore
      this._mapperRegistry.getMap<TEntity, TModel>(domainEntity).toPersistance(domainEntity),
    );

    await updater(entities);

    await feedDomainEventsFromEntities(this._domainEvents, domainEntities);

    return domainEntities;
  }
}
