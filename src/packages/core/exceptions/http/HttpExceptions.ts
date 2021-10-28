import HttpException from './HttpException';
import { HttpStatus } from '../../types';

export class BadRequestException extends HttpException {
  constructor(description = 'Bad Request') {
    super(HttpStatus.BAD_REQUEST, description);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(description = 'Unauthorized') {
    super(HttpStatus.UNAUTHORIZED, description);
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(description = 'Payment Required') {
    super(HttpStatus.PAYMENT_REQUIRED, description);
  }
}

export class ForbiddenException extends HttpException {
  constructor(description = 'Forbidden') {
    super(HttpStatus.FORBIDDEN, description);
  }
}

export class NotFoundException extends HttpException {
  constructor(description = 'File Not Found') {
    super(HttpStatus.NOT_FOUND, description);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(description = 'Method Not Allowed') {
    super(HttpStatus.METHOD_NOT_ALLOWED, description);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(description = 'Not Acceptable') {
    super(HttpStatus.NOT_ACCEPTABLE, description);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(description = 'Proxy Authentication Required') {
    super(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, description);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(description = 'Request Timeout') {
    super(HttpStatus.REQUEST_TIMEOUT, description);
  }
}

export class ConflictException extends HttpException {
  constructor(description = 'Conflict') {
    super(HttpStatus.CONFLICT, description);
  }
}

export class GoneException extends HttpException {
  constructor(description = 'Gone') {
    super(HttpStatus.GONE, description);
  }
}

export class LengthRequiredException extends HttpException {
  constructor(description = 'Length Required') {
    super(HttpStatus.LENGTH_REQUIRED, description);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(description = 'Precondition Failed') {
    super(HttpStatus.PRECONDITION_FAILED, description);
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(description = 'Payload Too Large') {
    super(HttpStatus.PAYLOAD_TOO_LARGE, description);
  }
}

export class UriTooLongException extends HttpException {
  constructor(description = 'Uri Too Long') {
    super(HttpStatus.URI_TOO_LONG, description);
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(description = 'Unsupported Media Type') {
    super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, description);
  }
}

export class RequestedRangeNotSatisfiableException extends HttpException {
  constructor(description = 'Requested Range Not Satisfiable') {
    super(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, description);
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(description = 'Expectation Failed') {
    super(HttpStatus.EXPECTATION_FAILED, description);
  }
}

export class IAmATeapotException extends HttpException {
  constructor(description = 'I Am A Teapot') {
    super(HttpStatus.I_AM_A_TEAPOT, description);
  }
}

export class MisdirectedException extends HttpException {
  constructor(description = 'Misdirected') {
    super(HttpStatus.MISDIRECTED, description);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(description = 'Unprocessable Entity') {
    super(HttpStatus.UNPROCESSABLE_ENTITY, description);
  }
}

export class FailedDependencyException extends HttpException {
  constructor(description = 'Failed Dependency') {
    super(HttpStatus.FAILED_DEPENDENCY, description);
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(description = 'Precondition Required') {
    super(HttpStatus.PRECONDITION_REQUIRED, description);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(description = 'Too Many Requests') {
    super(HttpStatus.TOO_MANY_REQUESTS, description);
  }
}

export class InternalException extends HttpException {
  constructor(description = 'Internal Server Error') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, description);
  }
}

export class NotImplementedException extends HttpException {
  constructor(description = 'Not Implemented') {
    super(HttpStatus.NOT_IMPLEMENTED, description);
  }
}

export class BadGatewayException extends HttpException {
  constructor(description = 'Bad Gateway') {
    super(HttpStatus.BAD_GATEWAY, description);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(description = 'Service Unavailable') {
    super(HttpStatus.SERVICE_UNAVAILABLE, description);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(description = 'Gateway Timeout') {
    super(HttpStatus.GATEWAY_TIMEOUT, description);
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(description = 'Http Version Not Supported') {
    super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, description);
  }
}
