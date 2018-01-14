const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#title', () => {
	
	  it('is a String', async () => {
		const titleNotAString = 21;	
		const item = new Item({title: titleNotAString});
		assert.strictEqual(item.title, titleNotAString.toString());
	  });
	  
	  it('is a required field', async () => {
		const item = new Item({title: ''});
		item.validateSync();
		assert.equal(item.errors.title.message, 'Path `title` is required.');
	  });
  });

  describe('#description', () => {
	
	  it('is a String', async () => {
		const descNotAString = 21;	
		const item = new Item({description: descNotAString});
		assert.strictEqual(item.description, descNotAString.toString());
	  });
	  
	  it('is a required field', async () => {
		const item = new Item({description: ''});
		item.validateSync();
		assert.equal(item.errors.description.message, 'Path `description` is required.');
	  });
  });
  
  describe('#imageUrl', () => {
	
	  it('is a String', async () => {
		const imageUrlNotAString = 21;	
		const item = new Item({imageUrl: imageUrlNotAString});
		assert.strictEqual(item.imageUrl, imageUrlNotAString.toString());
	  });
	  
	  it('is a required field', async () => {
		const item = new Item({imageUrl: ''});
		item.validateSync();
		assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
	  });
  });
  
});

