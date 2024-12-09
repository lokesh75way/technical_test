import request from 'supertest';
import app from './app';

describe('POST /recommendations', () => {
  it('should generate and save recommendations', async () => {
    const response = await request(app)
      .post('/recommendations')
      .send({
        userId: 'test_user',
        preferences: ['science fiction', 'artificial intelligence', 'space exploration']
      });

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe('test_user');
    expect(Array.isArray(response.body.recommendations)).toBe(true);
  });
});
