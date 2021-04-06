import Author from './Author';
import DBModel from './DBModel';

export type Book = {
  title: string;
  topic: string;
  releaseDate: Date;
  author: Author;
  authorId: string;
};

export type BookModel = DBModel<Book>;

export default Book;
