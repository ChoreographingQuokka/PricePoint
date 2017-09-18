const Promise = require('bluebird');
const models = require('../../db/models');

module.exports.addCategory = (user, table) => {
  return models.Categories.forge({
    name: table,
    profile_id: user.id,
  }).save();
};

module.exports.addItem = (user, table, upc) => {
  //search item by upc, get product id
  //find category id is by user id and table name
  //add category id and product id to categories_products
  return models.Categories.forge({
    
  });
};

module.exports.retrieveCategory = () => {
  // given user id from profile, return each category with each item within category
};

var retrieveProductID = () => {
  //search item by upc, get product id
};

var retrieveCategoryID = () => {
  //find category id is by user id and table name
};
