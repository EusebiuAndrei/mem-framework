import { EntityRepository, Repository } from 'typeorm';
import Project from '../../../../models/Project';

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {}

export default ProjectRepository;
