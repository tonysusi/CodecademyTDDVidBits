const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /videos', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
     await mongoose.disconnect();
  });

  // Write your test blocks below:
  describe('POST', () => {
    it('posts new video', async () => {
      const response = await request(app)
        .post('/videos');
      assert.equal(response.status, 201);
      // assert.equal(response.headers.location, '/');
    });
    it('renders an video with a title and image', async () => {

      const response = await request(app)
      .post(`/video`);
      //
      // assert.include(parseTextFromHTML(response.text, '.item-title'), item.title);
      // const imageElement = findImageElementBySource(response.text, item.imageUrl);
      // assert.equal(imageElement.src, item.imageUrl);
    });
  });
});
