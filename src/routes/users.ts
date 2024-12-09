// src/routes/users.ts

import { Router } from 'express';
import { getUserRecommendation } from '../controllers/users.controller';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

// GET route to get user's recommendation
// - Handles the request asynchronously using the getUserRecommendation controller
router.get('/:userId/recommendations', expressAsyncHandler(getUserRecommendation));


export default router;
