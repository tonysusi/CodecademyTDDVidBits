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

describe('User visits the home page', () => {

  describe('User deleting video ', () => {
    it('removes the Video from the list', () => {
      const videoToCreate = postVideoData();

      browser.click('#delete');
      browser.url('/');

      assert.notInclude(browser.getText('body'), videoToCreate.title);
    });
  });
});
