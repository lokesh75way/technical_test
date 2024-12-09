import axios from "axios";

const client = axios.create({
    baseURL: process.env.LLM_URL || 'http://localhost:8080',
})

/**
 * Generate recommendations using the LLM (Large Language Model) API based on user preferences.
 *
 * @async
 * @function
 * @param {Object} payload - The request payload to send to the LLM API.
 * @param {string[]} payload.preferences - An array of user preferences to guide the recommendation generation.
 * @returns {Promise<{ recommendations: string[] }>} A promise that resolves to an object containing an array of recommendations.
 *
 */
export const generateRecommendations = async (payload: { preferences: string[] }): Promise<{ recommendations: string[] }> => {
    const { data } = await client.post("/llm/generate", payload)
    return data;
}
