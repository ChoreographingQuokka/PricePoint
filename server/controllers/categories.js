const Promise = require('bluebird');
const models = require('../../db/models');

module.exports.addCategory = (user, table) => {
  return models.Categories.forge({
    name: table,
    profile_id: user,
  }).save();
};

module.exports.addItem = (user, table, upc) => {
  return models.Product.where({
    upc: upc
  })
    .then(product => {
      let productId = product.serialize().id;
      return models.Categories.forge({
        profile_id: user,
        name: table
      }).products().attach(productId);
    });
};

module.exports.retrieveCategory = (user) => {
  // given user id from profile, return each category with each item within category
  return models.Categories.where({
    profile_id: user
  }).fetch()
    .then(categories => {
      return categories.serialize();
    });
};



var retrieveProductID = () => {
  //search item by upc, get product id
};

var retrieveCategoryID = () => {
  //find category id is by user id and table name
};
