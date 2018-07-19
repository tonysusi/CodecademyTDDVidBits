const Video = require('../../models/video');
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
// const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');

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
    it('renders an video with a title and description', async () => {
      const videoToCreate = {
        title: 'Video Title',
        description: 'Video Description'
      };

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne(videoToCreate);
      assert.isOk(createdVideo, 'Video was not created successfully in the database');

    });
  });
});
