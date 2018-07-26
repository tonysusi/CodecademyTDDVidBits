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

// remove one video
router.get('/videos/:id/delete', async (req, res, next) => {
  const videoId = req.params.id;
  const videos = await Video.deleteOne({id:videoId});
  res.render('videos/create', {error:'Deleted '+ videoId});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  res.render('videos/edit', {video: video});
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
    // console.log(newVideo.errors);
    if (newVideo.errors) {
      res.status(400).render('videos/create', {newVideo: newVideo});
    } else {
      await newVideo.save();
      res.status(302).render('videos/show', {newVideo: newVideo});
    }
  }
});


module.exports = router;
