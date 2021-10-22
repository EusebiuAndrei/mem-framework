import { ApiResponse } from './ApiResponse';
import { HttpStatus } from '../../types';

export class Ok extends ApiResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.OK, message);
  }
}
