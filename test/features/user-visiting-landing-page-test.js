const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

const postVideoData = () => {
  const videoToCreate = buildVideoObject();
  browser.url('/videos/create');
  browser.setValue('#title-input', videoToCreate.title);
  browser.setValue('#description-input', videoToCreate.description);
  browser.setValue('#url-input', videoToCreate.url);
  browser.click('#submit-button');
  return videoToCreate;
};

describe('User visits the landing page', () => {
    // const videoToCreate = buildVideoObject();
    const generateRandomUrl = (domain) => {
      return `http://${domain}/${Math.random()}`;
    };

    describe('on first visit', () => {
      it('no videos are present', () => {
        browser.url('/');
        assert.include(browser.getText('#videos-container'),'');
      });
    });
    describe('with existing videos', () => {
      it('video title and url are rendered', () => {
        const videoToCreate = postVideoData();
        browser.url('/videos');

        assert.include(browser.getText('#videos-container'), videoToCreate.title);
        assert.include(browser.getHTML('#videos-container'), videoToCreate.url);
      });
      it('can navigate to a video', () => {
        const videoToCreate = postVideoData();
        browser.url('/videos');
        browser.click('.video-title a');

        assert.include(browser.getText('#videos-container'), videoToCreate.title);
        assert.include(browser.getHTML('#videos-container'), videoToCreate.url);
      });
    });
    describe('clicks on "Save a video" button', () => {
      it('navigates to create page', () => {
        // Setup
        browser.url('/');
        // Exercise
        browser.click('a.input-button');
        // Verification
        assert.include(browser.getText('body'), 'Create');
      });
    });
});
