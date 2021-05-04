import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, EntitySchema } from 'typeorm';

const PhotoSchema = new EntitySchema({
  name: 'Photo',
  tableName: 'photos',
  columns: {},
});

@Entity('fgf', { schema: 'Photo' })
class Photo {
  private _id: number;
  private _name: string;
  private _description: string;
  private _filename: string;
  private _views: number;
  private _isPublished: boolean;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get filename() {
    return this._filename;
  }
  get views() {
    return this._views;
  }
  get isPublished() {
    return this._isPublished;
  }
}

export default Photo;
