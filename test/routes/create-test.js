const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject, buildItemObjectNoTitle, buildItemObjectNoDesc, buildItemObjectNoUrl} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);
  afterEach(diconnectDatabase);
  
  describe('GET', () => {
    it('renders empty input fields', async () => {
		
      const response = await request(app)
	    .get('/items/create');
	
	  const titleInput = parseTextFromHTML(response.text, 'input#title-input');
	  const imageUrlInput = parseTextFromHTML(response.text, 'input#imageUrl-input');
	  const descriptionInput = parseTextFromHTML(response.text, 'textarea#description-input');
	  
	  assert.equal(titleInput, '');
	  assert.equal(imageUrlInput, '');
	  assert.equal(descriptionInput, '');
	  
	});
  });
  
  describe('POST', () => {
    it('renders and creates/stores a new item', async () => {
	  
	  const response = await request(app)
	    .post('/items/create')
		.type('form')
		.send(itemToCreate);
	  
	  const createdItem = await Item.findOne(itemToCreate);
	  
	  assert.notEqual(createdItem, null, "createdItem shouldn't be null, looks like it wasn't created successfully");
	});
	
	it('redirects to root', async () => {
	  
	  const response = await request(app)
	    .post('/items/create')
		.type('form')
		.send(itemToCreate);
	
	  assert.equal(response.status, 302);
	  assert.equal(response.headers.location, '/');
	  
	});
	
	
	it("throws an error if title is missing and doesn't save the item", async () => {
	  const itemToCreate = buildItemObjectNoTitle();
	  
	  const response = await request(app)
	    .post('/items/create')
		.type('form')
		.send(itemToCreate);
		
	  const renderedHtml = parseTextFromHTML(response.text, 'form');
	  
	  assert.deepEqual(await Item.find({}), []);
	  assert.equal(response.status, 400);
	  assert.include(renderedHtml, 'required');
	  
	});
	
	it("throws an error if description is missing and doesn't save the item", async () => {
	  const itemToCreate = buildItemObjectNoDesc();
	  
	  const response = await request(app)
	    .post('/items/create')
		.type('form')
		.send(itemToCreate);
	
	  const renderedHtml = parseTextFromHTML(response.text, 'form');
	  
	  assert.deepEqual(await Item.find({}), []);
	  assert.equal(response.status, 400);
	  assert.include(renderedHtml, 'required');
	  
	});
	
	it("throws an error if url is missing and doesn't save the item", async () => {
	  const itemToCreate = buildItemObjectNoUrl();
	  
	  const response = await request(app)
	    .post('/items/create')
		.type('form')
		.send(itemToCreate);
	
	  const renderedHtml = parseTextFromHTML(response.text, 'form');
	  
	  assert.deepEqual(await Item.find({}), []);
	  assert.equal(response.status, 400);
	  assert.include(renderedHtml, 'required');
	  
	});
	
	
  });
});

