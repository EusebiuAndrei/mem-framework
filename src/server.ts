import CQServer from './core/@cqs/CQServer';
import HelloQuery from './HelloQuery';
import HelloMutation from './HelloMutation';

const cqsServer = new CQServer({
  context: (req) => {
    let user = null;
    if (req.headers.authorization) {
      user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    return { user };
  },
  queries: [new HelloQuery()],
  mutations: [new HelloMutation()],
});

cqsServer.listen();
