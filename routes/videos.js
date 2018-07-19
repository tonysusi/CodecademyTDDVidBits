const Video = require('../models/video');
const router = require('express').Router();

router.get('/videos', async (req, res, next) => {
  res.render('videos');
});

router.post('/videos', async (req, res, next) => {

  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('videos', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.status(201).render('videos');
  }

});

module.exports = router;
