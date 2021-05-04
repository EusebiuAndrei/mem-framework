class CreateTaskDto {
  title: string;
  description: string;
  estimatedTime: number;
  priorityId?: number;
  // assigneesIds: number[];
}

export default CreateTaskDto;
