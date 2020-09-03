import express from 'express';
import ApiKeyRepo from '../database/repository/ApiKeyRepo';
import { ForbiddenError } from '../core/api/ApiError';
import Logger from '../core/Logger';
import { PublicRequest } from 'app-request';
import schema from './schema';
import validator, { ValidationSource } from '../core/helpers/validator';
import asyncHandler from '../core/helpers/asyncHandler';

const router = express.Router();

export default router.use(
  // validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
    Logger.info(apiKey);

    if (!apiKey) throw new ForbiddenError();
    return next();
  }),
);
