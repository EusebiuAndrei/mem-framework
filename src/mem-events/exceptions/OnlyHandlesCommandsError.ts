class OnlyHandlesCommandsError extends Error {
  constructor() {
    super('CommandHandler can only handle Commands');
  }
}

export default OnlyHandlesCommandsError;
