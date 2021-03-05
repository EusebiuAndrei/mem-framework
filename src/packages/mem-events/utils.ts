import MemEventEmitter from './MemEventEmitter';
import MemMediator from './MemMediator';
import { EventType } from './types';
import EventEmitter = NodeJS.EventEmitter;

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createMem() {
  const memEventEmitter = MemEventEmitter.create();
  const memMediator = MemMediator.create(memEventEmitter);

  return {
    memEventEmitter,
    memMediator,
  };
}

export function registerHandlers(
  eventEmitter: EventEmitter,
  mediator: MemMediator,
  handlers: any[],
) {
  handlers.forEach((handler) => {
    const meta = Reflect.get(handler, 'meta');
    const callback = handler.handle.bind(handler);

    if (meta.scope === EventType.EVENT) {
      eventEmitter.on(meta.event.name, callback);
    } else {
      mediator.on(meta.event.name, callback);
    }
  });
}
