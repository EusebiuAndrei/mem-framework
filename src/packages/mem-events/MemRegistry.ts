import { EventType } from './types';
import MemEventEmitter from './MemEventEmitter';
import MemMediator from './MemMediator';
import { getHandlerMetadata } from './decorators';

class MemRegistry {
  public static memEventEmitter = MemEventEmitter.create();
  public static memMediator = MemMediator.create(MemRegistry.memEventEmitter);

  public static create(...handlers: any[]) {
    handlers.forEach((handler: any) => MemRegistry.register(handler));
  }

  private static register(handler: any) {
    const meta = getHandlerMetadata(handler);
    if (meta.kind === EventType.EVENT) {
      MemRegistry.memEventEmitter.on(meta.event.name, handler.handle);
    } else {
      MemRegistry.memMediator.on(meta.event.name, handler.handle);
    }
  }
}

export default MemRegistry;
