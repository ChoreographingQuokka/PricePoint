const db = require('../');

const Categories_Products = db.Model.extend({
  tableName: 'categories_products',

  categories: function() {
    return this.hasMany('Categories');
  },

  products: function() {
    return this.hasMany('Products');
  },

});

module.exports = db.model('Categories_Products', Categories_Products);
