import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the document
export interface RecommendationDocument extends Document {
  userId: string;
  recommendations: string[];
  preferences: string[]
}

// Create the schema
const Recommendation: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  recommendations: { type: [String], required: true },
  preferences: { type: [String], require: true }
});

// Export the model
export const RecommendationModel = mongoose.model<RecommendationDocument>('Recommendation', Recommendation);

