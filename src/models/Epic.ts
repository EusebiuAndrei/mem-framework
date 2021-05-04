import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import Task from './Task';
import Status from './Status';
import Priority from './Priority';
import User from './User';
import Project from './Project';

@Entity()
class Epic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Status, { cascade: true })
  @JoinColumn()
  status: Status;

  @ManyToOne(() => Priority, { cascade: true })
  @JoinColumn()
  priority: Priority;

  @ManyToOne(() => Project, (project) => project.epics, { nullable: true })
  project: Project;

  @ManyToMany(() => User, (user) => user.epics, { nullable: true })
  @JoinTable()
  team: User[];

  @OneToMany(() => Task, (task) => task.epic, { nullable: true })
  @JoinColumn()
  tasks: Task[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

export default Epic;
