const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('Upload video', () => {
      const videoToCreate = buildVideoObject();
      // console.log(videoToCreate);
      // it('and enter video url', () => {
      //   browser.url('/videos/create.html');
      //   browser.setValue('#url-input', videoToCreate.videoUrl);
      //   assert.include(browser.getText('body'), videoToCreate.videoUrl);
      // });
      // it('and enter title', () => {
      //   browser.url('/videos/create.html');
      //   browser.setValue('#title-input', videoToCreate.title);
      //   assert.include(browser.getText('body'), videoToCreate.title);
      // });
      it('and enter description', () => {
        browser.url('/videos/create.html');
        browser.setValue('#description-input', videoToCreate.description);
        assert.include(browser.getText('body'), videoToCreate.description);
      });
      it('and redirects to landing page', () => {
        browser.url('/videos/create.html');
        browser.click('#submit-button');
        assert.include(browser.getText('body'), 'Home');
        // assert.include(browser.getText('#videos-container'),'');
      });
    });
});
