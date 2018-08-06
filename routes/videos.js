const Video = require('../models/video');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos: videos});
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos: videos});
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.get('/videos/:id', async (req, res, next) => {
  const videoId = req.params.id;
  const singleVideo = await Video.findById(videoId);
  res.render('videos/show', {newVideo: singleVideo});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  res.render('videos/edit', {video: video});
});

router.post('/videos/:id/update', async (req, res, next) => {
  const videoId = req.params.id;
  const {title, description, url} = req.body;
  // const oldVideo = { "title" : title, "description": description, "url": url };
  if (title == '') {
      res.status(400).redirect('/videos/'+videoId+'/edit');
    } else if (url == '') {
      res.status(400).redirect('/videos/'+videoId+'/edit');
  } else {

    const updatedVideo = await Video.updateOne({ '_id' : videoId },{ $set: { "title" : title, "description": description, "url": url } } );
    if (updatedVideo.errors) {
      res.status(400).redirect('/videos/'+videoId+'/edit');
    } else {
      res.status(302).redirect('/videos/'+videoId);
    }
  }
});

router.post('/videos', async (req, res, next) => {
  const {title, description, url} = req.body;
  const newVideo = new Video({title, description, url});
  if (newVideo.title == '') {
    res.status(400).render('videos/create',{error: 'title is required', video: newVideo});
  } else if (newVideo.url == '') {
    res.status(400).render('videos/create',{error: 'url is required', video: newVideo});
  } else {
    newVideo.validateSync();
    if (newVideo.errors) {
      res.status(400).render('videos/create', {newVideo: newVideo});
    } else {
      await newVideo.save();
      res.status(302).render('videos/show', {newVideo: newVideo});
    }
  }
});

router.post('/videos/delete', async (req, res, next) => {
  const {id} = req.body;
  const deletedVideo = await Video.deleteOne({_id:id});
  res.redirect('/videos');
});

module.exports = router;
