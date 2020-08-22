import QueryHandler from '../core/@cqs/QueryHandler';
import MutationHandler from '../core/@cqs/MutationHandler';

// modules
import hello from './hello';

const queries: QueryHandler[] = [...hello.queries];
const mutations: MutationHandler[] = [...hello.mutations];

export default { queries, mutations };
