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

export class ControllerWithEmptyPathException extends Error {
  constructor() {
    super('The path of the Controller must not be an empty string');
  }
}

export class NoHttpResponseException extends Error {
  constructor() {
    super('Route did not return an HttpResponse');
  }
}

export class ServerNotExtendingExpressServerException extends Error {
  constructor() {
    super('The Server class provided should extends ExpressServer class');
  }
}

export class LauncherNotExtendingBaseLauncherException extends Error {
  constructor() {
    super('The Launcher class provided should extends BaseLauncher class');
  }
}
