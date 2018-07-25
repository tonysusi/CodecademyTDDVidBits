const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    'title': String,
    // 'videoUrl': String,
    'description': String
  })
);

module.exports = Video;
