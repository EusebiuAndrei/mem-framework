import Book from './Book';
import DBModel from './DBModel';

export type Author = {
  name: string;
  age: number;
  books: Book[];
  booksIds: string[];
};

export type AuthorModel = DBModel<Author>;

export default Author;
