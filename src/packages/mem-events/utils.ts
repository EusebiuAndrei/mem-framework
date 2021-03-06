import { Emitter, EventType, Mediator } from './types';
import { getHandlerMetadata } from './decorators';

interface RegisterHandlersArgs {
  emitter: Emitter;
  mediator: Mediator;
  handlers: any[];
}

export const registerHandlers = ({ emitter, mediator, handlers }: RegisterHandlersArgs) => {
  handlers.forEach((handler) => {
    const meta = getHandlerMetadata(handler);
    const callback = handler.handle.bind(handler);

    if (meta.kind === EventType.EVENT) {
      emitter.on(meta.event.name, callback);
    } else {
      mediator.on(meta.event.name, callback);
    }
  });
};
