const knex = require('knex')(require('../../knexfile'));

exports.rollbackMigrate = () => {
  return knex.migrate.rollback()
    .then(function () {
      return knex.migrate.latest();
    })
    .then(function () {
      return knex.seed.run();
    })
    .catch(function (err) {
      console.log('error in migration:', err);
      throw err;
    });
};

exports.rollback = () => {
  return knex.migrate.rollback()
    .catch(function (err) {
      console.log('err in migration afterEach');
      throw err;
    });
};