import { InMemoryORM } from '../../packages/core';
import Book from './models/Book';
import Author from './models/Author';

const BOOKS_DB = './db/books.json';
const AUTHORS_DB = './db/authors.json';

import * as _ from 'lodash';

const booksRepo = new InMemoryORM<Book>(BOOKS_DB);
const authorsRepo = new InMemoryORM<Author>(AUTHORS_DB);

console.log('WHAAAT');

const main = async () => {
  // await booksRepo.load();
  // await authorsRepo.load();
  //
  // console.log('LALA');
  // console.log(await booksRepo.findAll());
  //
  // // await booksRepo.updateOne((item) => item.releaseDate !== null, { title: 'LaLa' });
  // // console.log(await booksRepo.findAll());
  //
  // const item: Book = {
  //   title: 'title A',
  //   topic: 'ABC',
  //   releaseDate: new Date(),
  //   author: null,
  //   authorId: null,
  // };
  // await booksRepo.create(item);
  //
  // console.log(await booksRepo.findAll());
  //
  // await booksRepo.save();
  //
  // await booksRepo.load();
  // console.log(await booksRepo.findAll());

  class EventTransport {
    constructor(instance: EventTransport) {
      _.assign(this, instance);
    }
  }

  class Address {
    public readonly city: string;
    public readonly street: string;
  }

  class Item extends EventTransport {
    public readonly name: string;
    public readonly power: number;
    public readonly address: Address;
  }

  const some = new Item({ name: 'Knife', power: 20, address: { city: 'Iasi', street: 'la' } });

  console.log(JSON.stringify(some, null, 2));
};

main();
