import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Task from './Task';

@Entity()
class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  color: string;

  @ManyToMany(() => Task, (task) => task.tags, { nullable: true })
  tasks: Task[];
}

export default Tag;
