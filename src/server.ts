import CQServer from './core/@cqs/CQServer';
import root from './modules';
import { CQSRequest } from 'app-request';
import { TContext, TInfo } from './types';

const cqServer = new CQServer<TContext, TInfo>({
  context: (req: CQSRequest<TContext, TInfo>) => {
    let user = null;
    if (req.headers.authorization) {
      user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    return { user };
  },
  info: (req: CQSRequest<TContext, TInfo>) => {
    return {};
  },
  queries: root.queries,
  mutations: root.mutations,
});

cqServer.listen();
