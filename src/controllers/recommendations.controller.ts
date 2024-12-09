// src/controllers/recommendationsController.ts

import { Request, Response } from 'express';
import * as llmService from '../services/llm';
import { RecommendationModel } from '../models/recommendation';
import createHttpError from "http-errors";

/**
 * Generates recommendations based on user preferences and stores them in the database.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const generateRecommendations = async (req: Request, res: Response) => {
  // Extract user ID and preferences from the request body
  const { userId, preferences } = req.body;

  // Generate recommendations using the LLM service
  const { recommendations } = await llmService.generateRecommendations({ preferences });

  // Update or create a recommendation document for the user
  const recommendation = await RecommendationModel.findOneAndUpdate(
    { userId },
    { userId, recommendations, preferences },
    { upsert: true } // Create if it doesn't exist
  );

  // Return the updated/created recommendation document as JSON
  res.json(recommendation);
};

/**
 * Fetches all recommendations from the database.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const getRecommendations = async (req: Request, res: Response) => {
  // Retrieve all recommendation documents from the database
  const dbRecommendation = await RecommendationModel.find({});

  // Return the recommendations as JSON
  res.json(dbRecommendation);
};

/**
 * Fetches a specific recommendation by its ID.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @throws {createHttpError} - If the recommendation is not found.
 * @returns {Promise<void>}
 */
export const getRecommendationById = async (req: Request, res: Response) => {
  // Extract the ID from the request body
  const { id } = req.body;

  // Retrieve the recommendation document by ID
  const dbRecommendation = await RecommendationModel.findById(id);

  // Throw an error if the recommendation is not found
  if (!dbRecommendation) throw createHttpError(400, { message: "Recommendation not found!" });

  // Return the found recommendation as JSON
  res.json(dbRecommendation);
};