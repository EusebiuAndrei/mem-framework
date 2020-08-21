import { corsUrl } from '../config';
import cors from 'cors';
import bodyParser from 'body-parser';

export default [
  bodyParser.json({ limit: '10mb' }),
  bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
  cors({ origin: corsUrl, optionsSuccessStatus: 200 }),
];
