import axios from "axios";

const client = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:8000',
})

/**
 * Creates a recommendation for a user.
 * 
 * @param {Object} payload - The request data.
 * @param {string} payload.userId - User ID.
 * @param {string[]} payload.preferences - User preferences.
 * @returns {Promise<Recommendation>} The created recommendation.
 */
export const createInterest = async (payload: {
    userId: string;
    preferences: string[];
}): Promise<Recommendation> => {
    const { data } = await client.post("/recommendations", payload)
    return data;
}

/**
 * Gets recommendations for a specific user.
 * 
 * @param {string} userId - User ID.
 * @returns {Promise<Recommendation>} The user's recommendations.
 */
export const getInterestByUserId = async (userId: string): Promise<Recommendation> => {
    const { data } = await client.get(`/users/${userId}/recommendations`)
    return data;
}