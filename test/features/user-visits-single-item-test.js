const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits single item', () => {
    describe('posts a new item', () => {
      it('and description appears when clicking on new item from root', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        
        browser.url('/');
		browser.click('.item-card a');
		
		assert.include(browser.getText('body'), itemToCreate.description);
		
      });
    });
	
	
});

