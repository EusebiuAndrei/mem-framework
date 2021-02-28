import EventEmitter = NodeJS.EventEmitter;

type Callback = (...args: any) => Promise<any>;

// 1 Event <-> 1 Listener ( Query | Command )
class MemMediator {
  private static instance: MemMediator = null;
  private eventEmitter: EventEmitter;
  private listeners: Map<string, Callback> = new Map<string, Callback>();

  private constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  public static create(eventEmitter: EventEmitter): MemMediator {
    if (!this.instance) {
      this.instance = new MemMediator(eventEmitter);
    }
    return this.instance;
  }

  // Register a handler for this event
  public on(eventName: string, callback: Callback) {
    const listenerExists = this.listeners.has(eventName);

    if (listenerExists) {
      throw new Error('Just one listener accepted');
    }

    this.listeners.set(eventName, callback);
  }

  // Send
  public async sendAction(event: any) {
    const meta = Reflect.get(event, 'meta');
    const listener = this.listeners.get(meta.name);

    if (!listener) {
      throw new Error(`There is not any listener for: ${meta.name}`);
    }

    return await listener(event);
  }

  public async emitAction(event: any) {
    const meta = Reflect.get(event, 'meta');
    const listener = this.listeners.get(meta.name);

    if (!listener) {
      throw new Error(`There is not any listener for: ${meta.name}`);
    }

    this.eventEmitter.emit(meta.name, event);
    return await listener(event);
  }

  // Send this event
  // Receive a response from the handler
  public async send(eventName: string, ...args: any) {
    const listener = this.listeners.get(eventName);

    if (!listener) {
      throw new Error(`There is not any listener for: ${eventName}`);
    }

    return await listener(args);
  }

  // Send this event
  // Emit this event forward
  // Receive a response from the handler
  public async emit(eventName: string, ...args: any) {
    const listener = this.listeners.get(eventName);

    if (!listener) {
      throw new Error(`There is not any listener for: ${eventName}`);
    }

    this.eventEmitter.emit(eventName, args);
    return await listener(args);
  }
}

export default MemMediator;
