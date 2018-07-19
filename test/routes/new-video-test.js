const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('posts new video', async () => {
      const response = await request(app)
        .post('/videos');
      assert.equal(response.status, 201);
      // assert.equal(response.headers.location, '/');
    });
  });
});
