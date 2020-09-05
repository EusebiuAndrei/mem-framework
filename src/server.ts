import 'reflect-metadata';
import CQServer from './core/@cqs/CQServer';
import root from './modules';
import { TContext } from './types';
import { Request } from 'express';
// d
const cqServer = new CQServer<TContext>({
  factory: {
    args: (req: Request) => {
      const globalReq = req as any;
      return { file: globalReq.file };
    },
    context: (req: Request) => {
      let user = null;
      if (req.headers.authorization) {
        user = { id: '43d', name: 'Pette', isAuthenticated: true };
      }

      return { user };
    },
  },
  queries: root.queries,
  mutations: root.mutations,
});

cqServer.listen();
