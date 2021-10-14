import 'reflect-metadata';
import { EventInstanceMetadata, EventMetadata, EventType } from '../types';
import { EVENT_METADATA_KEY } from './constants';

const BaseEvent = (eventKind: EventType, name?: string) =>
  // function <T extends { new (...args: any[]): {} }>(constructor: T): T {
  function <T extends { new (...args: any[]): {} }>(constructor: T): T {
    const eventMeta: EventMetadata = {
      name: name ?? extractNameFromConstructor(constructor, eventKind),
      kind: eventKind,
    };

    Reflect.defineMetadata(EVENT_METADATA_KEY, eventMeta, constructor);

    return class extends constructor {
      constructor(...args: any[]) {
        if (args.length === 1) {
          super(args[0]);
        } else {
          super(args);
        }

        const meta = getEventMetadata(this);
        const eventMeta: EventInstanceMetadata = {
          ...meta,
          timestamp: new Date(),
        };

        Reflect.defineMetadata(EVENT_METADATA_KEY, eventMeta, constructor);
      }
    };
  };

export const Query = (name?: string) => BaseEvent(EventType.QUERY, name);
export const Command = (name?: string) => BaseEvent(EventType.COMMAND, name);
export const Event = (name?: string) => BaseEvent(EventType.EVENT, name);

export const getEventMetadata = (object: Record<string, any>) => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  const meta: EventInstanceMetadata = Reflect.getMetadata(EVENT_METADATA_KEY, constructor);
  return meta;
};

export const hasEventMetadata = (object: Record<string, any>): boolean => {
  const constructor = Reflect.getPrototypeOf(object).constructor;
  return Reflect.hasMetadata(EVENT_METADATA_KEY, constructor);
};

const extractNameFromConstructor = (target: Function, eventType: EventType) => {
  let name = target.prototype.constructor.name;

  if (name.toUpperCase().endsWith(eventType)) {
    name = name.substring(0, name.length - eventType.length);
  }

  return name;
};
