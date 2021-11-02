import { Emitter, Mediator } from './types';
import MemEventEmitter from './MemEventEmitter';
import MemMediator from './MemMediator';
import { registerHandlers } from './utils';

interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

/**
 * a container of {@link MemEventEmitter} and {@link MemMediator}
 */
class MemEvents {
  public emitter: Emitter;
  public mediator: Mediator;

  constructor(emitter: Emitter, mediator?: Mediator) {
    this.emitter = emitter;

    if (mediator) {
      this.mediator = mediator;
    } else {
      this.mediator = MemMediator.create(emitter);
    }
  }

  public static create(options?: EventEmitterOptions) {
    return new MemEvents(MemEventEmitter.create(options));
  }

  /**
   * It registers each received handler for it's appropriate event
   * @param handlers any of {@link QueryHandler}/{@link CommandHandler}/{@link EventHandler}\
   */
  public registerHandlers(...handlers: any[]) {
    registerHandlers({ emitter: this.emitter, mediator: this.mediator, handlers: handlers });
  }
}

export default MemEvents;
