class OnlyHandlesQueriesError extends Error {
  constructor() {
    super('QueryHandler can only handle Queries');
  }
}

export default OnlyHandlesQueriesError;
