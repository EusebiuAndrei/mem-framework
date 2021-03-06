import { EventMetadata, EventType, HandlerMetadata } from '../types';
import { EVENT_METADATA_KEY, HANDLER_METADATA_KEY } from './constants';
import NotEventError from '../exceptions/NotEventError';
import OnlyHandlesCommandsError from '../exceptions/OnlyHandlesCommandsError';
import OnlyHandlesQueriesError from '../exceptions/OnlyHandlesQueriesError';

const BaseHandler = (handlerKind: EventType, EventClass: { new (...args: any[]): {} }) => {
  const eventMeta = Reflect.getMetadata(EVENT_METADATA_KEY, EventClass) as EventMetadata;
  if (!eventMeta) {
    throw new NotEventError();
  }

  switch (handlerKind) {
    case EventType.QUERY:
      if (eventMeta.kind !== EventType.QUERY) {
        throw new OnlyHandlesQueriesError();
      }
      break;
    case EventType.COMMAND:
      if (eventMeta.kind !== EventType.COMMAND) {
        throw new OnlyHandlesCommandsError();
      }
      break;
    case EventType.EVENT:
      break;
    default:
      break;
  }

  return function <T extends { new (...args: any[]): {} }>(contructor: T): T {
    const handlerMeta: HandlerMetadata = {
      kind: handlerKind,
      event: eventMeta,
    };

    Reflect.defineMetadata(HANDLER_METADATA_KEY, handlerMeta, contructor);

    return contructor;
  };
};

export const QueryHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.QUERY, EventClass);

export const CommandHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.COMMAND, EventClass);

export const EventHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.EVENT, EventClass);

export const getHandlerMetadata = (object: Record<string, any>) => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  const meta: HandlerMetadata = Reflect.getMetadata(HANDLER_METADATA_KEY, constructor);
  return meta;
};

export const hasHandlerMetadata = (object: Record<string, any>): boolean => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  return Reflect.hasMetadata(HANDLER_METADATA_KEY, constructor);
};
