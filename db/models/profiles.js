const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',

  auths: function() {
    return this.hasMany('Auth');
  },

  categories: function() {
    return this.hasMany('Categories');
  },

});

module.exports = db.model('Profile', Profile);
