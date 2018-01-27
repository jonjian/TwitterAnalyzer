exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('profiles', (table) => {
    table.increments('id').unsigned().primary();
    table.string('first', 100).nullable();
    table.string('last', 100).nullable();
    table.string('display', 100).nullable();
    table.string('email', 100).nullable().unique();
    table.string('phone', 100).nullable();
    table.timestamps(true, true);
  }),
  knex.schema.createTableIfNotExists('auths', (table) => {
    table.increments('id').unsigned().primary();
    table.string('type', 8).notNullable();
    table.string('oauth_id', 30).nullable();
    table.string('password', 100).nullable();
    table.string('salt', 100).nullable();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
  }),
  knex.schema.createTableIfNotExists('tweets', (table) => {
    table.increments('id').unsigned().primary();
    table.string('tweet_id', 100).nullable();
    table.timestamps(true, true);
    table.string('created_at', 100).nullable();
    table.
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('auths'),
  knex.schema.dropTable('profiles'),
]);
