import { MinLength } from 'class-validator';
import { Context } from '../../../types';
import { Info } from '../../../packages/core/@cqs/types';
import { SuccessResponse } from '../../../packages/core/api/ApiResponse';

export class Hello {
  @MinLength(3)
  id: string;
}

export class GetHelloArgs extends Hello {}

export interface GetHelloResult {
  args: Hello;
  ctx: Context;
}

export interface HelloQuery {
  getHello(args: GetHelloArgs, ctx: Context, info: Info): Promise<SuccessResponse<{ some: any }>>;
}
