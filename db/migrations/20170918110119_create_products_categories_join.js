exports.up = function(knex, Promise) {
  return (
    knex.schema.createTableIfNotExists('categories_products', table => {
      table.increments('id').unsigned().primary();
      table.integer('categories_id').references('categories.id').onDelete('CASCADE');
      table.integer('product_id').references('products.id').onDelete('CASCADE');
    })
  );
};

exports.down = function(knex, Promise) {
  return (
    knex.schema.table('categories_products', table => {
      table.dropForeign('categories_id');
      table.dropColumn('categories_id');
      table.dropForeign('product_id');
      table.dropColumn('product_id');
    }).dropTable('categories_products')
  );
};
