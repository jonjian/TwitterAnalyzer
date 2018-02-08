exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('tweet_increments', (table) => {
    table.increments('id').unsigned().primary();
    table.string('keyword', 100).nullable();
    table.string('timestamp', 1000).nullable();
    table.integer('sentiment').nullable();
    table.string('location', 1000).nullable();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('auths'),
  knex.schema.dropTable('profiles'),
  knex.schema.dropTable('tweets'),
  knex.schema.dropTable('tweet_increments'),
]);
