class NoListenerError extends Error {
  constructor(meta: any) {
    super(`There is not any listener for: ${meta.name}`);
  }
}

export default NoListenerError;
