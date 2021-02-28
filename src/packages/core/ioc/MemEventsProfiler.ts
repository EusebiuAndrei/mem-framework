import { Container } from 'inversify';
import { EventEmitter } from 'events';
import { MemEventEmitter, MemMediator } from '../../mem-events';

class MemEventsProfiler {
  public static async profile(container: Container): Promise<void> {
    container.bind<EventEmitter>('ee').toDynamicValue(() => MemEventEmitter.create());
    container
      .bind<MemMediator>(MemMediator)
      .toDynamicValue(() => MemMediator.create(container.get('ee')));
  }
}

export default MemEventsProfiler;