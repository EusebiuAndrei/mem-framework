abstract class BaseRepo<T> {
  abstract getAll(): Promise<T[]>;
  abstract getById(): Promise<T>;
  abstract add(entity: T): Promise<boolean>;
  abstract update(entity: T): Promise<boolean>;
  abstract delete(id: any): Promise<boolean>;
}

export default BaseRepo;
