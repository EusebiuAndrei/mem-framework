import express, { Express } from 'express';
import path from 'path';
import fs from 'fs';
//
class MiddlewareHandler {
  readonly app: Express = express();

  constructor(app: Express) {
    this.app = app;
  }

  async useConfigMiddlewares() {
    const middlewaresDirPath = path.join(__dirname, '..', '..', 'middlewares');
    const files = await fs.promises.readdir(middlewaresDirPath);
    const moduleNames = files.filter((file) => file.endsWith('.js'));

    for (const moduleName of moduleNames) {
      const modulePath = path.join(__dirname, '..', '..', 'middlewares', moduleName);
      const { default: middlewares } = await import(modulePath);
      if (middlewares && middlewares.length > 0) {
        middlewares.forEach((middleware: any) => {
          this.app.use(middleware);
        });
      }
    }
  }
}

export default MiddlewareHandler;

/*
async useConfigMiddlewares() {
    // this.app.use(bodyParser.json({ limit: '10mb' }));
    // this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    // this.app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  }
*/
