class OneListenerAcceptedError extends Error {
  constructor() {
    super('Just one listener accepted for a Query or a Command');
  }
}

export default OneListenerAcceptedError;
