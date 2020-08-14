import express from 'express';
import { CQSRequest } from 'app-request';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse } from '../../core/ApiResponse';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: CQSRequest, res) => {
    const { args } = req.cqs;
    return new SuccessResponse('success', args).send(res);
  }),
);

export default router;
