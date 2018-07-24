const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the landing page', () => {
    const videoToCreate = buildVideoObject();

    describe('views content', () => {
      it('on first visit and no videos exist', () => {
        browser.url('/');
        assert.include(browser.getText('#videos-container'),'');
      });
      it('of an existing video', () => {
        browser.url('/videos/create');
        browser.setValue('#title-input', videoToCreate.title);
        browser.click('#submit-button');
        browser.url('/videos');

        assert.include(browser.getText('#videos-container'), videoToCreate.title);
        // assert.include(browser.getText('body'), videoToCreate.description);

      });
    });
    describe('clicks on button', () => {
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
