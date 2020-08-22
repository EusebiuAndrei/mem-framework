import CQServer from './core/CQServer';
import HelloQuery from './core/HelloQuery';

// app
//   .listen(port, () => {
//     Logger.info(`server running on port : ${port}`);
//   })
//   .on('error', (e) => Logger.error(e));

const cqsServer = new CQServer({
  context: (req, res) => {
    let user = null;
    if (req.headers.authorization) {
      user = { id: '43d', name: 'Pette', isAuthenticated: true };
    }

    return { user };
  },
  queries: [new HelloQuery()],
  mutations: [],
});

cqsServer.listen();
