const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    'title': String,
    'url': String,
    'description': String
  })
);

module.exports = Video;
