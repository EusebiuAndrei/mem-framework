import 'reflect-metadata';
import cors from 'cors';
import bodyParser from 'body-parser';
import { injectable } from 'inversify';
import ExpressServer from '../packages/core/express/ExpressServer';

import { Logger } from './services';
import { port } from './config/index';

export const corsUrl = process.env.CORS_URL;
@injectable()
class Server extends ExpressServer {
  constructor(controller: any[]) {
    super(controller, { logger: Logger }, { port });
  }

  async setupMiddlewares(): Promise<void> {
    this.useMiddleware(bodyParser.json({ limit: '10mb' }));
    this.useMiddleware(
      bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
    );
    this.useMiddleware(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  }

  async setupErrorMiddlewares(): Promise<void> {
    return;
  }
}

export default Server;
