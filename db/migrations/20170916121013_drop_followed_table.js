exports.up = function(knex, Promise) {
  return knex.schema.dropTable('followed_products');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('followed_products', table => {
    table.increments('id').unsigned().primary();
  });
};
