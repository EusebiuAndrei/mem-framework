// queries
import HelloQuery from './queries/HelloQuery';

// mutations
import HelloMutation from './mutations/HelloMutation';

export default {
  queries: [new HelloQuery()],
  mutations: [new HelloMutation()],
};
