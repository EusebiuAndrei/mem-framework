import 'reflect-metadata';
import { EventMetadata, EventType } from '../types';
import { EVENT_METADATA_KEY } from './constants';

const BaseEvent = (eventKind: EventType, name?: string) =>
  function <T extends { new (...args: any[]): {} }>(constructor: T): T {
    const eventMeta: EventMetadata = {
      name: name ?? extractNameFromConstructor(constructor, eventKind),
      kind: eventKind,
    };

    Reflect.defineMetadata(EVENT_METADATA_KEY, eventMeta, constructor);
    constructor.prototype.meta = eventMeta;

    const lala = Reflect.getMetadata(EVENT_METADATA_KEY, constructor);
    console.log('LALA', lala);

    return class extends constructor {
      meta = {
        ...constructor.prototype.meta,
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

export const getEventMetadata = (object: Record<string, any>) => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  const meta: EventMetadata = Reflect.getMetadata(EVENT_METADATA_KEY, constructor);
  return meta;
};

export const hasEventMetadata = (object: Record<string, any>): boolean => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  return Reflect.hasMetadata(EVENT_METADATA_KEY, constructor);
};
