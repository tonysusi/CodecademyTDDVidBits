const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('Upload video', () => {
      const videoToCreate = buildVideoObject();

      it('and enter title and description', () => {
        browser.url('/videos/create');
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#title-input', videoToCreate.title);
        browser.click('#submit-button')

        assert.include(browser.getText('body'), videoToCreate.title);
        assert.include(browser.getText('body'), videoToCreate.description);
      });
      it('and redirects to show page', () => {
        browser.url('/videos/create');
        browser.click('#submit-button');

        assert.include(browser.getText('body'), 'Show');
        // assert.include(browser.getText('#videos-container'),'');
      });
    });
});
