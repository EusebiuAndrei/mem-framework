import { EventEmitter } from 'events';

interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

class MemEventEmitter extends EventEmitter {
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
}

export default MemEventEmitter;
