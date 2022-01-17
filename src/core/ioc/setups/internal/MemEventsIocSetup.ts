import { IocSetup } from '../../types';
import { Emitter, Mediator, MemEventEmitter, MemMediator } from '../../../../mem-events';

const MemEventsIocSetup: IocSetup = async (container) => {
  container.bind<Emitter>(MemEventEmitter).toDynamicValue(() => MemEventEmitter.create());
  container
    .bind<Mediator>(MemMediator)
    .toDynamicValue(() => MemMediator.create(container.get(MemEventEmitter)));
};

export default MemEventsIocSetup;
