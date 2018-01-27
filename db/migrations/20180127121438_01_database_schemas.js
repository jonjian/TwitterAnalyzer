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
    table.string('username', 100).nullable();
    table.string('text', 100000).nullable();
    table.string('keyword', 100).nullable();
    table.integer('sentiment').nullable();
    table.integer('favourites').nullable();
    table.integer('retweets').nullable();
    table.string('language', 100).nullable();
    table.string('geo', 1000).nullable();
    table.string('coordinates', 1000).nullable();
    table.string('timezone', 100).nullable();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('auths'),
  knex.schema.dropTable('profiles'),
  knex.schema.dropTable('tweets'),
]);
