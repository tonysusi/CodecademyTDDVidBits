const Video = require('../../models/video');
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders an existing video', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});

      assert.include(response.text, createdVideo.title);
      assert.include(response.text, createdVideo.description);
      assert.include(response.text, createdVideo.url);
    });
  });
  describe('POST', () => {
    it('posts new video', async () => {
      const videoToCreate = buildVideoObject();
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);
      assert.equal(response.status, 302);
      // assert.equal(response.headers.location, '/');
    });
    it('renders an video with a title', async () => {
      const videoToCreate = {
        title: 'Video Title'
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      assert.isOk(createdVideo, 'Video was not created successfully in the database');
    });
    it('returns video title', async () => {
      const videoToCreate = {
        title: 'Video Title'
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, videoToCreate.title);
    });
    it('video not saved with empty title', async () => {
      const videoToCreate = {
        title: ''
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
      const listOfVideos = await Video.find({});

      assert.equal(listOfVideos.length, 0);
    });
    it('when the title is missing, 400 response', async () => {
      const videoToCreate = {
        title: ''
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.equal(response.status, 400);
    });
    it('when the title is missing, redirects to video/create', async () => {
      const videoToCreate = {
        title: ''
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'Create');
    });
    it('when the title is missing, error message is displayed', async () => {
      const videoToCreate = {
        title: ''
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'title is required');
    });
    it('when the title is missing, data stays in form', async () => {
      const videoToCreate = {
        title: ''
      };
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'title is required');
    });
    it('saves a Video document', async () => {
      const videoToCreate = buildVideoObject();
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});

      assert.equal(videoToCreate.title, createdVideo.title);
      assert.equal(videoToCreate.description, createdVideo.description);
      assert.equal(videoToCreate.url, createdVideo.url);
    });
    it('video url is dynamic', async () => {
      const randomURL = `http://youtube.com/${Math.random()}`;
      const videoToCreate = buildVideoObject({url:randomURL});
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoShow = await request(app)
      .get('/videos');

      // assert.equal(createdVideo._id, videoShow.text);
      assert.include(videoShow.text, videoToCreate.url);
    });
    it('error with missing url', async () => {

      const videoToCreate = buildVideoObject({url:null});
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const videoShow = await request(app)
      .get('/videos/create');

      assert.include(videoShow.text, 'error');
    });
  });
});

describe('Server path: /videos/:id', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders video with title and url', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoShow = await request(app)
      .get('/videos/'+createdVideo._id);

      // assert.equal(createdVideo._id, videoShow.text);
      assert.include(videoShow.text, videoToCreate.title);
      assert.include(videoShow.text, videoToCreate.url);
    });
  });
});
