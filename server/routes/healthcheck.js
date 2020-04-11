import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

router.get('/status', async (req, res) => {
  let response = new ApiResponse();
  response.Ok({ status: 'App is up and running' });
  res.status(response.statusCode).json(response);
});

export default router;
