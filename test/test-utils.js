const {jsdom} = require('jsdom');

const Item = require('../models/item');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'not a bear';
  const imageUrl = options.imageUrl || 'http://i.telegraph.co.uk/multimedia/archive/03583/Sandon-m_3583054b.jpg';
  const description = options.description || 'this is a pic of not a bear';
  return {title, imageUrl, description};
};

// Create and return a sample Item object, but it's missing a title
const buildItemObjectNoTitle = (options = {}) => {
  const title = options.title || '';
  const imageUrl = options.imageUrl || 'http://i.telegraph.co.uk/multimedia/archive/03583/Sandon-m_3583054b.jpg';
  const description = options.description || 'this is a pic of not a bear';
  return {title, imageUrl, description};
};

// Create and return a sample Item object, but it's missing a description
const buildItemObjectNoDesc = (options = {}) => {
  const title = options.title || 'not a bear';
  const imageUrl = options.imageUrl || 'http://i.telegraph.co.uk/multimedia/archive/03583/Sandon-m_3583054b.jpg';
  const description = options.description || '';
  return {title, imageUrl, description};
};

// Create and return a sample Item object, but it's missing a url
const buildItemObjectNoUrl = (options = {}) => {
  const title = options.title || 'not a bear';
  const imageUrl = options.imageUrl || '';
  const description = options.description || 'this is a pic of not a bear';
  return {title, imageUrl, description};
};


// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
};

// extract text from an Element by selector
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// find image by source
const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};


module.exports = {
  buildItemObject,
  buildItemObjectNoTitle,
  buildItemObjectNoDesc,
  buildItemObjectNoUrl,
  seedItemToDatabase,
  parseTextFromHTML,
  findImageElementBySource,
};
