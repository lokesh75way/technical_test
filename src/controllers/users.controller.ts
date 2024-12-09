// src/controllers/usersController.ts

import { Request, Response } from 'express';
import { RecommendationModel } from '../models/recommendation';

/**
 * Fetches a specific user's recommendations based on their user ID.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const getUserRecommendation = async (req: Request, res: Response) => {
    // Extract the user ID from the route parameters
    const { userId } = req.params;

    // Find the recommendation document for the specified user ID
    const recommendations = await RecommendationModel.findOne({ userId });

    // Return the user's recommendations as JSON
    res.json(recommendations);
};