export class MissingControllersException extends Error {
  constructor() {
    super('No controllers provided');
  }
}

export class ControllerWithoutMetadataException extends Error {
  constructor() {
    super('Provided a Controller without decoration');
  }
}

export class NoHttpResponseException extends Error {
  constructor() {
    super('Route did not return an HttpResponse');
  }
}
