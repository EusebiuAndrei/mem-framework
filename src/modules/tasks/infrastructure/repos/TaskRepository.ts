import { EntityRepository, Repository } from 'typeorm';
import Task from '../../../../models/Task';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {}

export default TaskRepository;
