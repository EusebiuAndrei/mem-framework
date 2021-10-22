import { HttpError } from './ApiError';
import { HttpStatus } from '../../types';

export class BadRequestException extends HttpError {
  constructor(description = 'Bad Request') {
    super(HttpStatus.BAD_REQUEST, description);
  }
}

export class InternalException extends HttpError {
  constructor(description = 'Internal server error') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, description);
  }
}
