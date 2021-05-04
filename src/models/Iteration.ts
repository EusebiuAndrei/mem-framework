import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import Status from './Status';
import Task from './Task';

@Entity()
class Iteration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  // Finished - Active - Planned
  @OneToOne(() => Status, { cascade: true })
  @JoinColumn()
  status: Status;

  @OneToOne(() => Task, { cascade: true })
  task: Task;
}

export default Iteration;
