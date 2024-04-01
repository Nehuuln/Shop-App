const request = require('request');
const app = require('../index');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('POST /login', () => {
    it('should return a token when valid credentials are provided', async () => {
      // Register a user
      const userId = await registerUser('Test User', 'testuser@example.com', 'password123');
  
      // Login the user
      const token = await loginUser('testuser@example.com', 'password123');
  
      // Get the user profile
      const user = await getProfile(token);
  
      expect(user).to.have.property('name', 'Test User');
      expect(user).to.have.property('email', 'testuser@example.com');
      expect(user).to.have.property('_id');
    });
  
    it('should return an error when invalid credentials are provided', (done) => {
      request(app)
        .post('/login')
        .send({ email: 'testuser@example.com', password: 'wrongpassword' })
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Email or password are wrong');
          done();
        })
        .catch((err) => done(err));
    });
  });