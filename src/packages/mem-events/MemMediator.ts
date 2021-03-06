import { Emitter, EventCallback, Mediator } from './types';
import { NoListenerError, OneListenerAcceptedError } from './exceptions';
import { getEventMetadata } from './decorators';

// 1 Event <-> 1 Listener ( Query | Command )
class MemMediator implements Mediator {
  private static instance: MemMediator = null;
  private eventEmitter: Emitter;
  private listeners: Map<string, EventCallback> = new Map<string, EventCallback>();

  private constructor(eventEmitter: Emitter) {
    this.eventEmitter = eventEmitter;
  }

  public static create(eventEmitter: Emitter): MemMediator {
    if (!this.instance) {
      this.instance = new MemMediator(eventEmitter);
    }
    return this.instance;
  }

  // Register a handler for this event (query | command)
  public on(eventName: string, callback: EventCallback) {
    const listenerExists = this.listeners.has(eventName);

    if (listenerExists) {
      throw new OneListenerAcceptedError();
    }

    this.listeners.set(eventName, callback);
  }

  // Send this event
  // Receive a response from the handler
  public async send(event: any) {
    const meta = getEventMetadata(event);
    const listener = this.listeners.get(meta.name);

    if (!listener) {
      throw new NoListenerError(meta);
    }

    return await listener(event);
  }

  // Send this event
  // Emit this event forward
  // Receive a response from the handler
  public async emit(event: any) {
    const meta = getEventMetadata(event);
    const listener = this.listeners.get(meta.name);

    if (!listener) {
      throw new NoListenerError(meta);
    }

    this.eventEmitter.emit(event);
    return await listener(event);
  }
}

export default MemMediator;
