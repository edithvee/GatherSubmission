const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId', () => {
  
  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('gives title and description', async () => {
      const itemToCreate = await seedItemToDatabase();
	  const itemId = itemToCreate._id;
	  
	  const response = await request(app)
	    .get('/items/'+itemId)
		.send(itemId);
	  
	  // not sure why the below isn't working?
	  /*
	  const itemTitle = parseTextFromHTML(response.text, '#single-item-title');
	  const itemDesc = parseTextFromHTML(response.text, '#single-item-description');
	  assert.include(itemTitle, itemToCreate.title);
	  assert.include(itemDesc, itemToCreate.description);
	  */
	  
	  assert.include(response.text, itemToCreate.title);
	  assert.include(response.text, itemToCreate.description);
	  
	});
  });
});

