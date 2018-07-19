const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');


describe('Server path: /videos', () => {
  // beforeEach(connectDatabaseAndDropData);
  //
  // afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('post new video /videos', async () => {
      const response = await request(app)
        .post('/videos');
      assert.equal(response.status, 201);
      // assert.equal(response.headers.location, '/');
    });
  });
});
