const {assert} = require('chai');

describe('User visits the landing page', () => {
    describe('On first visit', () => {
      it('no videos exist', () => {
        browser.url('/');
        assert.include(browser.getText('#videos-container'),'');
      });
    });
});
