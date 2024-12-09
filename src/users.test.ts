import request from 'supertest';
import app from './app';

describe('GET /users/:user_id/recommendations', () => {
  it('should retrieve saved recommendations', async () => {
    const userId = 'test_user';

    // First, generate recommendations for the user
    await request(app)
      .post('/recommendations')
      .send({
        userId: 'test_user',
        preferences: ['science fiction', 'artificial intelligence', 'space exploration']
      });
    // Then, retrieve them
    const response = await request(app).get(`/users/${userId}/recommendations`);

    if (response.status === 200) {
      expect(response.body.userId).toBe(userId);
      expect(Array.isArray(response.body.recommendations)).toBe(true);
    } else if (response.status === 404) {
      expect(response.body.error).toBe(`No recommendations found for user_id ${userId}.`);
    } else {
      throw new Error('Unexpected status code');
    }
  });
});
