import CQServer from './core/@cqs/CQServer';
import root from './modules';

const cqServer = new CQServer({
  context: (req) => {
    let user = null;
    if (req.headers.authorization) {
      user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    return { user };
  },
  queries: root.queries,
  mutations: root.mutations,
});

cqServer.listen();
