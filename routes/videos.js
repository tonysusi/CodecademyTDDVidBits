const Video = require('../models/video');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/videos', async (req, res, next) => {
  res.render('videos');
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res, next) => {

  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('videos', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.status(201).render('videos/show', {newVideo: newVideo});
  }


});

module.exports = router;
