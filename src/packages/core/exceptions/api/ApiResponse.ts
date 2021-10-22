import { HttpResponseSender, HttpStatus } from './../../types';
import { Response } from 'express';

export abstract class ApiResponse implements HttpResponseSender {
  constructor(private status: HttpStatus, private message: string | Record<string, any>) {}

  protected prepare(res: Response, apiResponse: ApiResponse): Response {
    if (this.message === 'string') {
      res.status(this.status).send(apiResponse);
    }

    return res.status(this.status).json(ApiResponse.sanitize(apiResponse));
  }

  private static sanitize(response: Record<string, any>): Record<string, any> {
    const clone: Record<string, any> = {} as Record<string, any>;
    Object.assign(clone, response);
    // delete {some_field};
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }

  public send(res: Response): Response {
    return this.prepare(res, this);
  }
}

// export class AccessTokenErrorResponse extends ApiResponse {
//   private instruction = 'refresh_token';

//   constructor(message = 'Access token invalid') {
//     super(ResponseStatus.UNAUTHORIZED, message);
//   }

//   send(res: Response): Response {
//     res.setHeader('instruction', this.instruction);
//     return super.prepare(res, this);
//   }
// }
