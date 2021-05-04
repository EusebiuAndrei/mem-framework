import { Container } from 'inversify';
import { Connection } from 'typeorm';
import TaskRepository from './infrastructure/repos/TaskRepository';
import EpicRepository from './infrastructure/repos/EpicRepository';
import ProjectRepository from './infrastructure/repos/ProjectRepository';

class TasksIocProfiler {
  static async profile(container: Container) {
    container
      .bind<TaskRepository>(TaskRepository)
      .toDynamicValue(() => container.get(Connection).getCustomRepository(TaskRepository));
    container
      .bind<EpicRepository>(EpicRepository)
      .toDynamicValue(() => container.get(Connection).getCustomRepository(EpicRepository));
    container
      .bind<ProjectRepository>(ProjectRepository)
      .toDynamicValue(() => container.get(Connection).getCustomRepository(ProjectRepository));
  }
}

export default TasksIocProfiler;
