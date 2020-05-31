exports.up = function (knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();

    table.string('name').notNull();
    table.string('description', 1000).notNull();
    table.string('image_url', 1000).notNull();
    table.binary('content').notNull();

    table.integer('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .notNull();

    table.integer('user_id').references('id').inTable('users').notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('articles');
};
