const config = require('config')['Amazon'];
const amazon = require('amazon-product-api');

const products = require('../controllers/products');

const client = amazon.createClient(config);

var flattenXml = function(object) {
  if (Array.isArray(object)) {
    if (object.length === 1) {
      object = flattenXml(object[0]);
    } else {
      object = object.map(flattenXml);
    }
  } else if (typeof object === 'object') {
    for (let k in object) {
      object[k] = flattenXml(object[k]);
    }
  }

  return object;
};

const normalizeAmazonData = function(amazonData) {
  var item = {};

  amazonData = flattenXml(amazonData);

  if (amazonData.ItemAttributes) {
    var attributes = amazonData.ItemAttributes;

    if (attributes.Title) {
      item.name = attributes.Title;
    } else {
      // console.log('No name!');
    }

    if (attributes.Feature) {
      if (Array.isArray(attributes.Feature)) {
        item.description = attributes.Feature.join('\n');
      } else {
        item.description = attributes.Feature;
      }
    } else {
      // console.log(`${item.name} has no description`);
    }

    if (attributes.UPC) {
      item.upc = attributes.UPC;
    } else {
      // console.log(`${item.name} has no upc`);
    }

    if (attributes.ListPrice) {
      item.price = amazonData.OfferSummary
        ? amazonData.OfferSummary.LowestNewPrice.Amount
        : parseInt(attributes.ListPrice.Amount);
    } else {
      // console.log(`${item.name} has no list price`);
    }
  } else {
    // console.log('No attributes!');
  }

  if (amazonData.DetailPageURL) {
    item.itemURL = amazonData.DetailPageURL;
  } else {
    // console.log(`${item.name} has no url`);
  }

  if (amazonData.LargeImage) {
    item.imageURL = amazonData.LargeImage.URL;
  } else {
    // console.log(`${item.name} has no image url`);
  }

  return item;
};

var filterItems = item => !!item.upc && !!item.price;

module.exports.search = function(query) {
  if (typeof query === 'string') {
    query = {
      keywords: query,
      responseGroup: 'ItemAttributes,Images,OfferSummary',
    };
  }

  return client.itemSearch(query)
    .then(results => results.map(normalizeAmazonData).filter(filterItems))
    .then(results => {
      return products.storeFromVendor(results, 'Amazon');
    });
};

module.exports.lookup = function(upcCodes) {
  var query = {
    idType: 'UPC',
    itemId: upcCodes,
    responseGroup: 'ItemAttributes,Images,OfferSummary',
  };

  return client.itemLookup(query)
    .then(results => results.map(normalizeAmazonData).filter(filterItems));
};
