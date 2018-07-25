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

// router.get('/videos/delete', async (req, res, next) => {
//   const videos = await Video.deleteMany({});
//   res.render('videos/create');
// });

router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = new Video({title, description, videoUrl});
  if (newVideo.title == '') {
    res.status(400).render('videos/create',{error: 'title is required', video: newVideo});
  } else {
    newVideo.validateSync();
    if (newVideo.errors) {
      res.status(400).render('videos', {newVideo: newVideo});
    } else {
      await newVideo.save();
      res.status(302).render('videos/show', {newVideo: newVideo});
    }
  }
});


module.exports = router;
