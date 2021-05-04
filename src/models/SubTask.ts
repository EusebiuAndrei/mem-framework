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
  ManyToOne,
} from 'typeorm';
import User from './User';
import Status from './Status';
import WorkTrack from './ValueObjects/WorkTrack';
import Task from './Task';

@Entity()
class SubTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.subTasks)
  masterTask: Task;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column((type) => WorkTrack)
  workTrack: WorkTrack;

  @OneToOne(() => Status, { cascade: true })
  @JoinColumn()
  status: Status;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable()
  assignees: User[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

export default SubTask;
