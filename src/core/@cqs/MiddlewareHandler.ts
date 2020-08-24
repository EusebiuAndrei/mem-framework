import express, { Express, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { CQSRequest, GenericDictionary } from 'app-request';
import { DecorateWithCQSProps } from './decorateWithCQS';

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

  // public useCqsMiddleware = <TContext, TInfo>(props: DecorateWithCQSProps<TContext, TInfo>) => (
  //   req: CQSRequest<TContext, TInfo>,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   const { query, params, body } = req;

  //   // There are specific to a request (local)
  //   const defaultArgs = { ...query, ...params, ...body };
  //   const args: GenericDictionary = props.args ? props.args(req, res) : { ...defaultArgs };

  //   // These are available across any request (global)
  //   // This is where we should extract the user from the authorization token or make any similar operation from a cookie
  //   // const defaultContext = { cookies, signedCookies };
  //   // const ctx = props.context ? props.context(req, res) : { ...defaultContext };
  //   const ctx = props.context(req, res);

  //   // These are additional information about the request - not pretty sure what to put here yet
  //   // const info = props.info ? props.info(req, res) : req;
  //   const info = props.info(req, res);

  //   req.cqs = { args, ctx, info };

  //   next();
  // };
}

export default MiddlewareHandler;

/*
async useConfigMiddlewares() {
    // this.app.use(bodyParser.json({ limit: '10mb' }));
    // this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    // this.app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
  }
*/
