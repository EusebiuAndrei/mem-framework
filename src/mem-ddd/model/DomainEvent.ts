import { UniqueEntityID } from '..';

interface DomainEvent {
  occurredOn: Date;
  // getAggregateId(): UniqueEntityID;
}

export default DomainEvent;
