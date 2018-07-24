const Video = require('../../models/video');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}

describe('Model: Video', () => {
  describe('#title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});
      assert.strictEqual(video.title, titleAsNonString.toString());
    });
    // it('is required', () => {
    //   const item = new Item({});
    //   item.validateSync();
    //   assert.equal(item.errors.title.message, 'Path `title` is required.');
    // });
  });
  // describe('#description', () => {
  //   it('is a String', () => {
  //     const descriptionAsNonString = 1;
  //     const video = new Video({title: descriptionAsNonString});
  //     assert.strictEqual(video.title, descriptionAsNonString.toString());
  //   });
  //   // it('is required', () => {
  //   //   const item = new Item({});
  //   //   item.validateSync();
  //   //   assert.equal(item.errors.title.message, 'Path `title` is required.');
  //   // });
  // });
});
