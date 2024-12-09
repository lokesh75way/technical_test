// src/routes/recommendations.ts

import { Router } from 'express';
import { generateRecommendations, getRecommendationById, getRecommendations } from '../controllers/recommendations.controller';
import { catchError, validate } from '../middlewares/validation';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

// POST route to create a new recommendation
// - Validates the request body using 'create:recommendation' schema
// - Catches errors using catchError middleware
// - Handles the request asynchronously using the generateRecommendations controller
router.post(
  '/',
  validate('create:recommendation'),
  catchError,
  expressAsyncHandler(generateRecommendations)
);

// GET route to fetch all recommendations
// - Uses the getRecommendations controller to retrieve data
// - Handles the request asynchronously
router.get(
  '/',
  expressAsyncHandler(getRecommendations)
);

// GET route to fetch a specific recommendation by its ID
// - Extracts the ID from the route parameters
// - Uses the getRecommendationById controller to retrieve the recommendation
router.get(
  '/:id',
  expressAsyncHandler(getRecommendationById)
);


export default router;
