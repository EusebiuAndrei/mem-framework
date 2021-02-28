import EventType from '../EventType';

export interface Handler<TEvent, TResult> {
  handle(event: TEvent): Promise<TResult>;
}

const BaseHandler = (handlerScope: EventType, EventClass: { new (...args: any[]): {} }) => {
  const EventClassMeta = Reflect.get(EventClass.prototype, 'meta');

  switch (handlerScope) {
    case EventType.QUERY:
      if (EventClassMeta.scope !== EventType.QUERY) {
        throw new Error('QueryHandler can only handle Queries');
      }
      break;
    case EventType.COMMAND:
      if (EventClassMeta.scope !== EventType.COMMAND) {
        throw new Error('CommandHandler can only handle Commands');
      }
      break;
    case EventType.EVENT:
      break;
    default:
      break;
  }

  return function <T extends { new (...args: any[]): {} }>(contructor: T): T {
    contructor.prototype.meta = {
      event: EventClassMeta,
      scope: handlerScope,
    };
    return contructor;
    // return class extends contructor {
    //   meta = {
    //     event: EventClassMeta,
    //     scope: handlerScope,
    //   };
    // };
  };
};

export const QueryHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.QUERY, EventClass);

export const CommandHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.COMMAND, EventClass);

export const EventHandler = (EventClass: { new (...args: any[]): {} }) =>
  BaseHandler(EventType.EVENT, EventClass);
