import HttpResponse from './HttpResponse';
import { HttpStatus } from '../../constants';

class Continue extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.CONTINUE, message);
  }
}

export const HttpContinue = (message: string | Record<string, any>) => new Continue(message);

class SwitchingProtocols extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.SWITCHING_PROTOCOLS, message);
  }
}

export const HttpSwitchingProtocols = (message: string | Record<string, any>) =>
  new SwitchingProtocols(message);

class Processing extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PROCESSING, message);
  }
}

export const HttpProcessing = (message: string | Record<string, any>) => new Processing(message);

class Earlyhints extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.EARLYHINTS, message);
  }
}

export const HttpEarlyhints = (message: string | Record<string, any>) => new Earlyhints(message);

class Ok extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.OK, message);
  }
}

export const HttpOk = (message: string | Record<string, any>) => new Ok(message);

class Created extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.CREATED, message);
  }
}

export const HttpCreated = (message: string | Record<string, any>) => new Created(message);

class Accepted extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.ACCEPTED, message);
  }
}

export const HttpAccepted = (message: string | Record<string, any>) => new Accepted(message);

class NonAuthoritativeInformation extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NON_AUTHORITATIVE_INFORMATION, message);
  }
}

export const HttpNonAuthoritativeInformation = (message: string | Record<string, any>) =>
  new NonAuthoritativeInformation(message);

class NoContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NO_CONTENT, message);
  }
}

export const HttpNoContent = (message: string | Record<string, any>) => new NoContent(message);

class ResetContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.RESET_CONTENT, message);
  }
}

export const HttpResetContent = (message: string | Record<string, any>) =>
  new ResetContent(message);

class PartialContent extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PARTIAL_CONTENT, message);
  }
}

export const HttpPartialContent = (message: string | Record<string, any>) =>
  new PartialContent(message);

class Ambiguous extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.AMBIGUOUS, message);
  }
}

export const HttpAmbiguous = (message: string | Record<string, any>) => new Ambiguous(message);

class MovedPermanently extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.MOVED_PERMANENTLY, message);
  }
}

export const HttpMovedPermanently = (message: string | Record<string, any>) =>
  new MovedPermanently(message);

class Found extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.FOUND, message);
  }
}

export const HttpFound = (message: string | Record<string, any>) => new Found(message);

class SeeOther extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.SEE_OTHER, message);
  }
}

export const HttpSeeOther = (message: string | Record<string, any>) => new SeeOther(message);

class NotModified extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.NOT_MODIFIED, message);
  }
}

export const HttpNotModified = (message: string | Record<string, any>) => new NotModified(message);

class TemporaryRedirect extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.TEMPORARY_REDIRECT, message);
  }
}

export const HttpTemporaryRedirect = (message: string | Record<string, any>) =>
  new TemporaryRedirect(message);

class PermanentRedirect extends HttpResponse {
  constructor(message: string | Record<string, any>) {
    super(HttpStatus.PERMANENT_REDIRECT, message);
  }
}

export const HttpPermanentRedirect = (message: string | Record<string, any>) =>
  new PermanentRedirect(message);
