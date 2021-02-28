import EventType from '../EventType';
// scope - kind
const BaseEvent = (eventType: EventType, name?: string) =>
  function <T extends { new (...args: any[]): {} }>(contructor: T): T {
    contructor.prototype.meta = {
      name: name ?? extractNameFromConstructor(contructor, eventType),
      scope: eventType,
    };

    return class extends contructor {
      meta = {
        ...contructor.prototype.meta,
        timestamp: new Date(),
      };
    };
  };

export const Query = (name?: string) => BaseEvent(EventType.QUERY, name);
export const Command = (name?: string) => BaseEvent(EventType.COMMAND, name);
export const Event = (name?: string) => BaseEvent(EventType.EVENT, name);

const extractNameFromConstructor = (target: Function, eventType: EventType) => {
  let name = target.prototype.constructor.name;

  if (name.toUpperCase().endsWith(eventType)) {
    name = name.substring(0, name.length - eventType.length);
  }

  return name;
};
