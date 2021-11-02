import HttpResponse from './HttpResponse';
import { HttpStatus } from '../../constants';

export class Continue extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.CONTINUE, message);
  }
}

export class SwitchingProtocols extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.SWITCHING_PROTOCOLS, message);
  }
}

export class Processing extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PROCESSING, message);
  }
}

export class Earlyhints extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.EARLYHINTS, message);
  }
}

export class Ok extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.OK, message);
  }
}

export class Created extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.CREATED, message);
  }
}

export class Accepted extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.ACCEPTED, message);
  }
}

export class NonAuthoritativeInformation extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NON_AUTHORITATIVE_INFORMATION, message);
  }
}

export class NoContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NO_CONTENT, message);
  }
}

export class ResetContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.RESET_CONTENT, message);
  }
}

export class PartialContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PARTIAL_CONTENT, message);
  }
}

export class Ambiguous extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.AMBIGUOUS, message);
  }
}

export class MovedPermanently extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.MOVED_PERMANENTLY, message);
  }
}

export class Found extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.FOUND, message);
  }
}

export class SeeOther extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.SEE_OTHER, message);
  }
}

export class NotModified extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NOT_MODIFIED, message);
  }
}

export class TemporaryRedirect extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.TEMPORARY_REDIRECT, message);
  }
}

export class PermanentRedirect extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PERMANENT_REDIRECT, message);
  }
}
