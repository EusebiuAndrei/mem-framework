import 'reflect-metadata';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

class LifeMeta {
  estimated: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

export default LifeMeta;
