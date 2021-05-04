import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import Status from './Status';
import Priority from './Priority';
import User from './User';
import Epic from './Epic';

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Status, { cascade: true })
  @JoinColumn()
  status: Status;

  @OneToOne(() => Priority, { cascade: true })
  @JoinColumn()
  priority: Priority;

  @OneToMany(() => Epic, (epic) => epic.project)
  @JoinColumn()
  epics: Epic[];

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable()
  team: User[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

export default Project;
