import WorkTrack from '../../../models/ValueObjects/WorkTrack';

class EditTaskDto {
  title?: string;
  description?: string;
  completedTime?: number;
  statusId?: number;
  priorityId?: number;
  tagsIds?: number[];
  assigneesIds?: number[];
  subTasksIds?: number[];
  iterationId?: number;
  epicId?: number;
}

export default EditTaskDto;
