import { Emitter, EventType, Handler, Mediator } from './types';
import { getHandlerMetadata, hasEventMetadata, hasHandlerMetadata } from './decorators';
import NotEventError from './exceptions/NotEventError';
import NotHandlerError from './exceptions/NotHandlerError';

interface RegisterHandlersArgs {
  emitter: Emitter;
  mediator: Mediator;
  handlers: Handler<any, any>[];
}

export const registerHandlers = ({ emitter, mediator, handlers }: RegisterHandlersArgs) => {
  handlers.forEach((handler) => {
    guardHandler(handler);

    const meta = getHandlerMetadata(handler);
    const callback = handler.handle.bind(handler);

    if (meta.kind === EventType.EVENT) {
      emitter.on(meta.event.name, callback);
    } else {
      mediator.on(meta.event.name, callback);
    }
  });
};

export const guardEvent = (event: any) => {
  if (!hasEventMetadata(event)) {
    throw new NotEventError();
  }
};

export const guardHandler = (handler: any) => {
  if (!hasHandlerMetadata(handler)) {
    throw new NotHandlerError();
  }
};

export function createEvent<T>(EventClass: { new (...args: any[]): T }, eventParams: T): T {
  const event = new EventClass();
  guardEvent(event);

  for (const prop in eventParams) {
    event[prop] = eventParams[prop];
  }

  return event;
}
