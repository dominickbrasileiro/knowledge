exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();

    table.string('name').notNull();

    table.integer('parent_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
