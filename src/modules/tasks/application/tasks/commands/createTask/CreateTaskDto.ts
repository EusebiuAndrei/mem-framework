class CreateTaskDto {
  title: string;
  description: string;
  estimatedTime: number;
  statusId?: number;
  priorityId?: number;
  // assigneesIds: number[];
}

export default CreateTaskDto;
