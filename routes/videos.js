const router = require('express').Router();


router.get('/videos', async (req, res, next) => {
  res.render('videos');
});

router.post('/videos', async (req, res, next) => {
  res.status(201).render('videos');
});

module.exports = router;
