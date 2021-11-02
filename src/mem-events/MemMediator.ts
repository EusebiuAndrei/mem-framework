import { Emitter, EventCallback, Mediator } from './types';
import { NoListenerError, OneListenerAcceptedError } from './exceptions';
import { getEventMetadata } from './decorators';
import { guardEvent } from './utils';

/**
 * singleton\
 * 1 {@link Query}/{@link Command} - 1 {@link QueryHandler}/{@link CommandHandler}, 0..* {@link EventHandler}\
 * Types of events: {@link Event}/{@link Query}/{@link Command}
 * {@link Query}/{@link Command} are also of type {@link Event}
 */
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

  /**
   * registers a callback for a {@link Query}/{@link Command}
   * @param eventName
   * @param callback
   */
  public on(eventName: string, callback: EventCallback) {
    const listenerExists = this.listeners.has(eventName);

    if (listenerExists) {
      throw new OneListenerAcceptedError();
    }

    this.listeners.set(eventName, callback);
  }

  /**
   * sends a Query/Command to the appropriate {@link QueryHandler}/{@link CommandHandler}
   * @param event an instance of a class decorated with {@link Event}/{@link Query}/{@link Command}
   * @returns the response that the handler returns
   */
  public async send(event: any) {
    guardEvent(event);

    const meta = getEventMetadata(event);
    const listener = this.listeners.get(meta.name);

    if (!listener) {
      throw new NoListenerError(meta);
    }

    return await listener(event);
  }

  /**
   * emits this event forward, sends a {@link Query}/{@link Command} to the appropriate {@link QueryHandler}/{@link CommandHandler}
   * @param event an instance of a class decorated with {@link Event}/{@link Query}/{@link Command}
   * @returns the response that the handler returns
   */
  public async emit(event: any) {
    guardEvent(event);

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
