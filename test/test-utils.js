const {jsdom} = require('jsdom');
const {assert} = require('chai');

const Video = require('../models/video');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const url = options.url || 'http://placebear.com/g/200/300';
  const description = options.description || 'Just the best video';
  return {title, url, description};
  // return {title,description};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const postVideoData = (videoToCreate) => {
  // const videoToCreate = buildVideoObject();
  browser.url('/videos/create');
  browser.setValue('#title-input', videoToCreate.title);
  browser.setValue('#description-input', videoToCreate.description);
  browser.setValue('#url-input', videoToCreate.url);
  browser.click('#submit-button');
  return videoToCreate;
};

module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
};
