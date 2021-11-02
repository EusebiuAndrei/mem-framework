import { HttpResponseSender } from '../../types';
import { Response } from 'express';

/**
 * This is the base exception for http errors
 * It knows how to send the response to the client
 */
class HttpException extends Error implements HttpResponseSender {
  constructor(
    private readonly status: number,
    private readonly response: string | Record<string, any>,
  ) {
    super();
    this.initMessage();
    this.name = this.constructor.name;
  }

  private initMessage() {
    if (typeof this.response === 'string') {
      this.message = this.response;
    } else {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
    }
  }

  protected generateHttpResponse() {
    if (typeof this.response === 'string') {
      return {
        statusCode: this.status,
        message: this.response,
      };
    }

    return this.response;
  }

  public send(res: Response): Response {
    if (typeof this.response === 'string') {
      return res.status(this.status).send(this.generateHttpResponse());
    }

    return res.status(this.status).json(this.generateHttpResponse());
  }
}

export default HttpException;

/*
export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}
*/
