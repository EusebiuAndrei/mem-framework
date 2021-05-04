import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import Role from './Role';
import Task from './Task';
import Epic from './Epic';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToOne(() => Role, { cascade: true, nullable: true })
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Task, (task) => task.assignees, { nullable: true })
  tasks: Task[];

  @ManyToMany(() => Epic, (epic) => epic.team)
  epics: Epic[];
}

export default User;
