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

// router.get('/videos/delete', async (req, res, next) => {
//   const videos = await Video.deleteMany({});
//   res.render('videos/create');
// });

router.post('/videos', async (req, res, next) => {
  const {title} = req.body;
  const newVideo = new Video({title});
  if (newVideo.title == '') {
    res.status(400).render('videos/create',{error: 'title is required'});
  } else {
    newVideo.validateSync();
    if (newVideo.errors || newVideo.title == '') {
      res.status(400).render('videos', {newVideo: newVideo});
    } else {
      await newVideo.save();
      res.status(201).render('videos/show', {newVideo: newVideo});
    }
  }
});


module.exports = router;
