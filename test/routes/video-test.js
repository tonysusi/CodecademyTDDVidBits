const Video = require('../../models/video');
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders an existing video', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});

      assert.include(response.text, createdVideo.title);
    });
  });

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
    it('returns video title and description', async () => {
      const videoToCreate = {
        title: 'Video Title',
        description: 'Video Description'
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, videoToCreate.title);
      assert.include(response.text, videoToCreate.description);
    });
    it('no video if no title', async () => {
      const videoToCreate = {
        description: 'Video Description'
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      // console.log(response.text);

      assert.notInclude(response.text, videoToCreate.title);

    });
  });
});
