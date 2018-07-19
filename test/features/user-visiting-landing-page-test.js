const {assert} = require('chai');

describe('User visits the landing page', () => {
    describe('views content on first visit', () => {
      it(' and no videos exist', () => {
        browser.url('/');
        assert.include(browser.getText('#videos-container'),'');
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
