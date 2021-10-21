import { EventEmitter } from 'events';
import { Emitter, EventCallback } from './types';
import { getEventMetadata } from './decorators';
import { guardEvent } from './utils';

interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

/**
 * singleton\
 * wrapper over {@link Emitter}\
 * accepts only instances of classes decorated with {@link Event}/{@link Query}/{@link Command}
 */
class MemEventEmitter extends EventEmitter implements Emitter {
  private static instance: MemEventEmitter = null;

  private constructor(options?: EventEmitterOptions) {
    super(options);
  }

  public static create(options?: EventEmitterOptions): MemEventEmitter {
    if (!this.instance) {
      this.instance = new MemEventEmitter(options);
    }
    return this.instance;
  }

  /**
   * registers a callback for a {@link Event}
   * @param eventName
   * @param callback
   */
  // @ts-ignore
  public on(eventName: string, callback: EventCallback) {
    super.on(eventName, callback);
  }

  /**
   *
   * @param event an instance of a class decorated with {@link Event}/{@link Query}/{@link Command}
   * @returns the result of emitting the event through {@link Emitter}
   */
  // @ts-ignore
  public emit(event: any) {
    guardEvent(event);

    const meta = getEventMetadata(event);
    return super.emit(meta.name, event);
  }
}

export default MemEventEmitter;
