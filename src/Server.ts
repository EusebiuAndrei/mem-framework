import 'reflect-metadata';
import ExpressServer from './packages/core/express/ExpressServer';
import { Express } from 'express';
import abc from './auth';

import cors from 'cors';
import bodyParser from 'body-parser';

import { corsUrl } from './config';
import { injectable } from 'inversify';
import passport from 'passport';

@injectable()
class Server extends ExpressServer {
  constructor(controller: any[]) {
    super(controller);
  }

  async useMiddlewares(app: Express): Promise<void> {
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
    abc(passport);
  }
}

export default Server;
