import { inject, injectable } from 'inversify';
import { MemMediator } from '../../mem-events';
import DomainEvent from './DomainEvent';
import { traverseDeep } from '../utils';
import { Entity } from './Entity';

@injectable()
class DomainEvents {
  @inject(MemMediator) private _mediator: MemMediator;

  private _events: DomainEvent[] = [];

  public addDomainEvents(events: DomainEvent[]): void {
    this._events = [...this._events, ...events];
  }

  public removeDomainEvents(events: DomainEvent[]): void {
    this._events = this._events.filter((event) => {
      const names = events.map((e) => e.constructor.name);
      return names.includes(event.constructor.name);
    });
  }

  public clearDomainEvents(events: DomainEvent[]): void {
    this._events = [];
  }

  public publish(): void {
    this._events.forEach((event) => this._mediator.emit(event));
  }
}

export default DomainEvents;

export function feedDomainEventsFromEntity(domainEvents: DomainEvents, entity: Entity<any>) {
  traverseDeep(entity, (key: any, value: any) => {
    if (value instanceof Entity) {
      const hasDomainEvents = value.domainEvents.length > 0;
      if (!hasDomainEvents) return;

      domainEvents.addDomainEvents(value.domainEvents);
    }
  });
}

export function feedDomainEventsFromEntities(domainEvents: DomainEvents, entities: Entity<any>[]) {
  entities.forEach((entity) => feedDomainEventsFromEntity(domainEvents, entity));
}
