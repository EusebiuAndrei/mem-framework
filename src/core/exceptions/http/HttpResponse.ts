import { HttpResponseSender } from '../../types';
import { Response } from 'express';
import { HttpStatus } from '../../constants';

/**
 * A response that should be sent to the client should always be an instance of this class
 * Generic class for any http response
 * It knows how to send the response appropriately
 */
class HttpResponse implements HttpResponseSender {
  constructor(private status: HttpStatus, private message: string | Record<string, any>) {}

  protected prepare(res: Response, httpResponse: HttpResponse): Response {
    if (this.message === 'string') {
      res.status(this.status).send(httpResponse);
    }

    return res.status(this.status).json(HttpResponse.sanitize(httpResponse));
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

export default HttpResponse;

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
