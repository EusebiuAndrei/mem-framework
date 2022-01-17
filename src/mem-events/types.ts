/**
 * 1 {@link Query}/{@link Command} - 1 {@link QueryHandler}/{@link CommandHandler}, 0..* {@link EventHandler}\
 * Types of events: {@link Event}/{@link Query}/{@link Command}
 * {@link Query}/{@link Command} are also of type {@link Event}
 */
export enum EventType {
  QUERY = 'QUERY',
  COMMAND = 'COMMAND',
  EVENT = 'EVENT',
}

/*
  QUERY/COMMAND - ApplicationEvent
  EVENT - DomainEvent + anything else
*/

export type EventCallback = (...args: any) => Promise<any>;

// Base interfaces types

export interface Emitter {
  on(eventName: string, callback: EventCallback): void;
  emit(event: any): boolean;
}

export interface Mediator {
  on(eventName: string, callback: EventCallback): void;
  emit(event: any): Promise<void>;
  send(event: any): Promise<void>;
}

export interface Handler<TEvent, TResult> {
  handle(event: TEvent): Promise<TResult>;
}

// Decorators metadata types

export interface EventMetadata {
  name: string;
  kind: EventType;
}

export interface EventInstanceMetadata extends EventMetadata {
  timestamp: Date;
}

export interface HandlerMetadata {
  event: EventMetadata;
  kind: EventType;
}
