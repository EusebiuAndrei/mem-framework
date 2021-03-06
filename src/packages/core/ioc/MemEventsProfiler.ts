import { Container } from 'inversify';
import { Emitter, Mediator, MemEventEmitter, MemMediator } from '../../mem-events';

class MemEventsProfiler {
  public static async profile(container: Container): Promise<void> {
    container.bind<Emitter>('ee').toDynamicValue(() => MemEventEmitter.create());
    container
      .bind<Mediator>(MemMediator)
      .toDynamicValue(() => MemMediator.create(container.get('ee')));
  }
}

export default MemEventsProfiler;
