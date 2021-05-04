import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Photo from './models/Photo';
import { Entity } from './packages/mem-ddd';
import DomainEvents, { feedDomainEvents } from './packages/mem-ddd/model/DomainEvents';
import { traverseDeep } from './packages/mem-ddd/utils';

class ABC {
  @feedDomainEvents(new DomainEvents())
  async aa() {
    return 'try';
  }
}

const a = new ABC();

const main = async () => {
  const b = await a.aa();
  console.log(b);
};

main();
