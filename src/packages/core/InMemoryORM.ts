import * as fs from 'fs';
import { uuid } from 'uuidv4';

class InMemoryORM<T> {
  private state: T[] = [];
  private readonly jsonPath: string;

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
  }

  async load() {
    this.state = await JSONService.loadJson<T>(this.jsonPath);
  }

  async save() {
    try {
      await JSONService.writeJson(this.jsonPath, this.state);
      return true;
    } catch (err) {
      return false;
    }
  }

  async create(instance: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) {
    this.state.push(({
      ...instance,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown) as T);
  }

  async findOne(callback: (value: T, index: number, array: T[]) => boolean): Promise<T> {
    return this.state.find(callback);
  }

  async findMany(callback: (value: T, index: number, array: T[]) => boolean): Promise<T[]> {
    return this.state.filter(callback);
  }

  async findAll(): Promise<T[]> {
    return this.state;
  }

  async updateOne(
    callback: (value: T, index: number, array: T[]) => boolean,
    updatedItem: Partial<T>,
  ): Promise<void> {
    const item = await this.findOne(callback);
    await this.deleteOne(callback);

    const newItem = { ...item, ...updatedItem, updatedAt: new Date() };
    this.state.push(newItem);
  }

  async updateMany(
    callback: (value: T, index: number, array: T[]) => boolean,
    updatedItem: Partial<T>,
  ): Promise<void> {
    this.state = this.state.map((value: T, index: number, array: T[]) => {
      if (callback(value, index, array)) {
        return { ...value, ...updatedItem, updatedAt: new Date() };
      }

      return value;
    });
  }

  async deleteOne(callback: (value: T, index: number, array: T[]) => boolean): Promise<void> {
    const itemIndex = this.state.findIndex(callback);
    this.state = [...this.state.slice(0, itemIndex), ...this.state.slice(itemIndex + 1)];
  }

  async deleteMany(callback: (value: T, index: number, array: T[]) => boolean): Promise<void> {
    this.state = this.state.filter((value: T, index: number, array: T[]) => {
      const hasToBeDeleted = callback(value, index, array);
      return !hasToBeDeleted;
    });
  }
}

export default InMemoryORM;

class JSONService {
  static async loadJson<T>(jsonPath: string): Promise<T[]> {
    const buffer = await fs.promises.readFile(jsonPath);
    const json = buffer.toString('utf-8');

    return JSON.parse(json) as T[];
  }

  static async writeJson<T>(jsonPath: string, jsonObject: T) {
    const json = JSON.stringify(jsonObject, null, 4);
    await fs.promises.writeFile(jsonPath, json, 'utf-8');
  }
}
