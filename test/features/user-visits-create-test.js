const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('user visits Create page', () => {
	describe('posting a new item', () => {
		it('displays the new item', () => {
		
		const title = 'not a bear';
		const description = 'this is a pic of not a bear';
		const imageUrl = 'http://i.telegraph.co.uk/multimedia/archive/03583/Sandon-m_3583054b.jpg';
		browser.url('/items/create');
		
		browser.setValue('#title-input', title);
		browser.setValue('#description-input', description);
		browser.setValue('#imageUrl-input', imageUrl);
		browser.click('#submit-button');
		
		assert.include(browser.getText('body'), title);
		assert.include(browser.getAttribute('body img', 'src'), imageUrl);
		
		});
	});
});

