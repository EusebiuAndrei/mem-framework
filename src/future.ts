import { Query } from 'mongoose';

interface Repository<T> {
  findById(id: string): T;
  findAll(): T[];
  create(object: any): T;
  update(id: string, object: any): T;
  delete(id: string): T;
}

// All repos should implement this Repository interface
// Should have a command "gen repo --model=user" - creates a UserRepo class that implements Repository<User>
/*
    - sth like this should be generated
    class UserRepo implements Repository<any> {}
*/

// Regarding services
class UserService {
  // thia method should normally use dto for response
  // create a method to automatically make this dto mapping
  getAllUsers(): any[] {
    return [];
  }
}

// Regarding Events
// all the events for a specific entity should be in a speicigic class
class UserEvents {}

// For each entity of a model

// define all types involved in types.ts using class-validator
// each query takes an args object as the single param, it describes all the incoming data
// idem for Mutations
class User {} //...

class GetUserArgs {
  id: string;
}

class GetAllUsersResult {
  users: User[];
  cursor: string;
}

// It would be nice if we had the ability to use type here instead of class

interface UserQuery {
  getAllUsers(): GetAllUsersResult;
  getUser(args: GetUserArgs): User;
}

// Possibly implement some restrictions on this
interface UserMutation {
  createUser(args: { user: User }): User[];
}

// for implementing - two choices
/* 
    class UserQuery extends Query implements UserQuery {} 
*/
// or
/*
    @Query
    class UserQuery implements UserQuery
*/
// idem for mutations
