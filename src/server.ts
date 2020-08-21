import CQServer from './core/CQServer';
import bodyParser from 'body-parser';
import { SuccessResponse } from './core/ApiResponse';
import schema from './routes/v1/profile/schema';
import decorateWithCQS from './core/decorateWithCQS';
import QueryHandler from './core/QueryHandler';

// app
//   .listen(port, () => {
//     Logger.info(`server running on port : ${port}`);
//   })
//   .on('error', (e) => Logger.error(e));

const appQueries = [
  {
    method: 'get',
    resource: '/john',
    schema: schema.userId,
    handler(args: any, ctx: any, info: any) {
      return new SuccessResponse('success', { args, ctx });
    },
  },
];

const cqsServer = new CQServer({
  context: (req, res) => {
    let user = null;
    if (req.headers.authorization) {
      user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    return { user };
  },
  queries: appQueries,
  mutations: [],
});

cqsServer.listen();

const abc = new QueryHandler();
