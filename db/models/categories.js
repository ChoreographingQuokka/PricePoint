const db = require('../');

const Categories = db.Model.extend({
  tableName: 'categories',

  profile: function() {
    return this.hasOne('Profile');
  },

  products: function() {
    return this.belongsToMany('Product');
  },

});

module.exports = db.model('Categories', Categories);
