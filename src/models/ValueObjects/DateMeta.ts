import 'reflect-metadata';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

class DateMeta {
  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  update: Date;
}

export default DateMeta;
