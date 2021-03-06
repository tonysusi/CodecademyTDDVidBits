const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('Upload video', () => {
      const videoToCreate = buildVideoObject();

      it('and enter title', () => {
        browser.url('/videos/create');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#url-input', videoToCreate.url);
        browser.click('#submit-button')

        assert.include(browser.getText('body'), videoToCreate.title);
      });
      it('and redirects to show page', () => {
        browser.url('/videos/create');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#url-input', videoToCreate.url);
        browser.click('#submit-button');

        assert.include(browser.getText('body'), 'Show');
      });
    });
});
