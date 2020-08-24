// import express, { Request, Response, NextFunction } from 'express';
// import Logger from './core/Logger';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { corsUrl, environment } from './config';
// import './database'; // initialize database
// import { NotFoundError, ApiError, InternalError } from './core/api/ApiError';
// import routesV1 from './routes/v1';
// import { CQSRequest } from 'app-request';
// import asyncHandler from './helpers/asyncHandler';
// import { SuccessResponse } from './core/ApiResponse';
// import validator, { ValidationSource } from './helpers/validator';
// import schema from './routes/v1/profile/schema';
// import decorateWithCQS from './core/@cqs/decorateWithCQS';
// import { CQS } from './core/@cqs/cqs';

// export const app = express();

// // app.use(bodyParser.json({ limit: '10mb' }));
// // app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
// app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// // app.use(
// //   decorateWithCQS({
// //     context: (req, res) => {
// //       let user = null;
// //       if (req.headers.authorization) {
// //         user = { id: '43d', name: 'Pette', isAuthenticated: true };
// //       }

// //       return { user };
// //     },
// //   }),
// // );

// app.get(
//   '/some',
//   validator(schema.userId, ValidationSource.ARGS),
//   asyncHandler(async (req: CQSRequest, res) => {
//     const { args, ctx } = req.cqs;
//     return new SuccessResponse('success', { args, ctx }); //.send(res);
//   }),
// );

// // CQS(app, {
// //   method: 'get',
// //   resource: '/john',
// //   schema: schema.userId,
// //   middlewares: [
// //     bodyParser.json({ limit: '10mb' }),
// //     decorateWithCQS({
// //       context: (req, res) => {
// //         let user = null;
// //         if (req.headers.authorization) {
// //           user = { id: '43d', name: 'Pette', isAuthenticated: true };
// //         }

// //         return { user };
// //       },
// //     }),
// //   ],
// //   handler(args, ctx, info) {
// //     return new SuccessResponse('success', { args, ctx });
// //   },
// // });

// // Routes
// app.use('/v1', routesV1);

// // catch 404 and forward to error handler
// app.use((req, res, next) => next(new NotFoundError()));

// // Middleware Error Handler
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     ApiError.handle(err, res);
//   } else {
//     if (environment === 'development') {
//       Logger.error(err);
//       return res.status(500).send(err.message);
//     }
//     ApiError.handle(new InternalError(), res);
//   }
// });

// process.on('uncaughtException', (e) => {
//   Logger.error(e);
// });

// export default app;
