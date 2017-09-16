exports.up = function(knex, Promise) {
  return (
    knex.schema.table('followed_products', table => {
      table.dropForeign('profile_id');
      table.dropColumn('profile_id');
      table.dropForeign('product_id');
      table.dropColumn('product_id');
    })
  );
};

exports.down = function(knex, Promise) {
  return (
    knex.schema.table('followed_products', table => {
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('product_id').references('products.id').onDelete('CASCADE');
    })
  );
};
