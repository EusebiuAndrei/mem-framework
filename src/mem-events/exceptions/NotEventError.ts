class NotEventError extends Error {
  constructor() {
    super(`This is not an event`);
  }
}

export default NotEventError;
