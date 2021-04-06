type DBModel<T> = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & T;

export default DBModel;
