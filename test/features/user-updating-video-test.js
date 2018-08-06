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

describe('User visits the update page', () => {
    describe('User updating video', () => {
      it('changes the values', () => {
        const newTitle = 'New Title';
        const newDescription = 'New Description';
        const newUrl = 'New Url';
        const videoToCreate = postVideoData();

        browser.click('#edit');
        browser.setValue('#title-input', newTitle);
        browser.click('#submit-button');

        // assert.include(browser.getText('body'), newTitle);

      });
      it('is updated, not created', () => {
        const newTitle = 'New Title';
        const newDescription = 'New Description';
        const newUrl = 'New Url';
        const videoToCreate = postVideoData();

        browser.click('#edit');
        browser.setValue('#title-input', newTitle);
        browser.click('#submit-button');

        assert.include(browser.getText('body'), newTitle);
        assert.notInclude(browser.getText('body'), videoToCreate.title);

      });
    });
});
