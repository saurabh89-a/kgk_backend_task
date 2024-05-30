import request from 'supertest';
import { app } from '../app'; // Ensure app.js exports app using named export

describe('Authentication', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password123', email: 'test@example.com' })
      .expect(201)
      .end(done);
  });

  it('should login the user', (done) => {
    request(app)
      .post('/users/login')
      .send({ username: 'testuser', password: 'password123' })
      .expect(200)
      .end(done);
  });
});
