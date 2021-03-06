import { EventEmitter } from 'events';
import { Emitter, EventCallback } from './types';
import { getEventMetadata } from './decorators';

interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

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

  // @ts-ignore
  public on(eventName: string, callback: EventCallback) {
    super.on(eventName, callback);
  }

  // @ts-ignore
  public emit(event: any) {
    const meta = getEventMetadata(event);
    return super.emit(meta.name, event);
  }
}

export default MemEventEmitter;
