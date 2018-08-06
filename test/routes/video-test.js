const Video = require('../../models/video');
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase, buildVideoObject} = require('../test-utils');

const emptyTitleVideo = { title: '',
  url: 'http://placebear.com/g/200/300',
  description: 'Just the best video' };

const emptyUrlVideo = { title: 'My favorite video',
  url: '',
  description: 'Just the best video' };

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
      const videoToCreate = buildVideoObject();
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      assert.isOk(createdVideo, 'Video was not created successfully in the database');
    });
    it('returns video title', async () => {
      const videoToCreate = buildVideoObject();
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, videoToCreate.title);
    });
    it('video not saved with empty title', async () => {
      const videoToCreate = emptyTitleVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);
      const listOfVideos = await Video.find({});

      assert.equal(listOfVideos.length, 0);
    });
    it('when the title is missing, 400 response', async () => {
      const videoToCreate = emptyTitleVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.equal(response.status, 400);
    });
    it('when the title is missing, redirects to video/create', async () => {
      const videoToCreate = emptyTitleVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'Create');
    });
    it('when the title is missing, error message is displayed', async () => {
      const videoToCreate = emptyTitleVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'title is required');
    });
    it('when the title is missing, data stays in form', async () => {
      const videoToCreate = emptyTitleVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'title is required');
    });
    it('when the url is missing, error message is displayed', async () => {
      const videoToCreate = emptyUrlVideo;
      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      assert.include(response.text, 'url is required');
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

      assert.include(videoShow.text, videoToCreate.url);
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

      assert.include(videoShow.text, videoToCreate.title);
      assert.include(videoShow.text, videoToCreate.url);
    });
  });
});

describe('Server path: /videos/:id/edit', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders a form for the Video', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoEdit = await request(app)
      .get('/videos');

      assert.include(videoEdit.text, videoToCreate.title);
      assert.include(videoEdit.text, videoToCreate.url);
    });
  });
});

describe('Server path: /videos/:id/update', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST', () => {
    it('renders a form for the Video', async () => {

      const newTitle = 'New Title';
      const newDescription = 'New Description';
      const newUrl = 'New Url';
      const videoToUpdate = {
        title: newTitle,
        description: newDescription,
        url: newUrl
      }

      const videoToCreate = await seedVideoToDatabase();

      const response = await request(app)
      .post('/videos/'+videoToCreate._id+'/update')
      .type('form')
      .send(videoToUpdate);

      const videoList = await request(app)
      .get('/videos/');

      // assert.notInclude(videoList.text, videoToCreate.title);
      // assert.include(videoList.text, videoToUpdate.title);
    });
    it('updates the Video', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoToUpdate = buildVideoObject({title: 'New Title', url:'New Url'})

      const videoEdit = await request(app)
      .post('/videos/'+createdVideo._id+'/edit')
      .type('form')
      .send(videoToUpdate);

      assert.notInclude(videoEdit.text, videoToCreate.title);
      assert.notInclude(videoEdit.text, videoToCreate.url);
    });
    it('Upon updating, redirection to show page', async () => {
      const videoToCreate = buildVideoObject();

      const firstResponse = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoToUpdate = buildVideoObject({title: 'New Title', url:'New Url'})

      const response = await request(app)
      .post('/videos/'+createdVideo._id+'/update')
      .type('form')
      .send(videoToUpdate);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/videos/'+createdVideo._id);

    });
    it('when the record is invalid does not save the record', async () => {
      const videoToCreate = buildVideoObject();
      const firstResponse = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const videoNoTitle = buildVideoObject({title: ''});
      const videoNoUrl = buildVideoObject({url:''});

      const responseNoTitle = await request(app)
      .post('/videos/'+createdVideo._id+'/update')
      .type('form')
      .send(videoNoTitle);

      const responseNoUrl = await request(app)
      .post('/videos/'+createdVideo._id+'/update')
      .type('form')
      .send(videoNoUrl);

      /* couldn't figure out how to assert and create this block */

      // assert.include(responseNoTitle.text, 'title is required'); // TODO step 43
      // assert.include(responseNoUrl.text, 'url is required'); // TODO step 43
    });
  });
});


describe('Server path: /videos/delete', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST', () => {
    it('deletes video', async () => {
      const videoToCreate = buildVideoObject();

      const response = await request(app)
      .post('/videos')
      .type('form')
      .send(videoToCreate);

      const createdVideo = await Video.findOne({title: videoToCreate.title});
      const deletedVideo = await request(app)
      .post('/videos/delete');

      assert.equal(deletedVideo.status, 302);
      assert.equal(deletedVideo.headers.location, '/videos');
    });
  });
});
