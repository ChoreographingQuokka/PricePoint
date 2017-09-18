const db = require('../');

const Categories = db.Model.extend({
  tableName: 'categories',

  profile: function() {
    return this.hasOne('Profile');
  },
  
});

module.exports = db.model('Categories', Categories);
