import express, { Express, Request, Response, NextFunction } from 'express';

class QueryHandler {
  protected readonly router = express.Router();
  protected queries: Array<any>;

  constructor() {}

  public getSome(some: any): void {
    // sd
    console.log(Object.keys(this));
    console.log(Object.getPrototypeOf(this));
    console.log(this);
  }
}

export default QueryHandler;
