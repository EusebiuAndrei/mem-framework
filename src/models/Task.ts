import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  EntitySchema,
} from 'typeorm';
import User from './User';
import Status from './Status';
import WorkTrack from './ValueObjects/WorkTrack';
import SubTask from './SubTask';
import Priority from './Priority';
import Tag from './Tag';
import Epic from './Epic';
import Iteration from './Iteration';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  estimatedTime: number;

  @Column({ nullable: true })
  completedTime: number;

  @Column({ nullable: true })
  remainingTime: number;

  @ManyToOne(() => Status, { cascade: true })
  @JoinColumn()
  status: Status;

  @ManyToOne(() => Priority, { cascade: true })
  @JoinColumn()
  priority: Priority;

  @ManyToMany(() => Tag, (tag) => tag.tasks, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.tasks, { nullable: true })
  @JoinTable()
  assignees: User[];

  @OneToMany(() => SubTask, (subTask) => subTask.masterTask, { nullable: true })
  @JoinColumn()
  subTasks: SubTask[];

  @OneToOne(() => Iteration, { cascade: true, nullable: true })
  @JoinColumn()
  iteration: Iteration;

  @ManyToOne(() => Epic, (epic) => epic.tasks, { nullable: true })
  epic: Epic;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

export default Task;
