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
  }).fetch()
    .then(product => {
      productId = product.serialize().id;
      return models.Categories.where({
        profile_id: user,
        name: table
      }).fetch()
        .then(category => {
          return category.products().attach(product);
        });
    });
};

module.exports.retrieveCategory = (user) => {
  var results = [];
  return models.Categories.where({
    profile_id: user
  }).fetchAll({withRelated: ['products']})
    .then(categories => {
      categories.serialize().forEach(el => {
        results.push({
          tableId: el.id,
          name: el.name,
          list: el.products
        });
      });
      return results;
    });
};

module.exports.removeItem = (user, table, upc) => {
  return models.Product.where({
    upc: upc
  }).fetch()
    .then(product => {
      return models.Categories.where({
        profile_id: user,
        name: table
      }).fetch()
        .then(category => {
          return category.products().detach(product);
        });
    });
};

module.exports.removeCategory = (user, table) => {
  return models.Categories.where({
    name: table,
    profile_id: user,
  }).destroy(); 
};
