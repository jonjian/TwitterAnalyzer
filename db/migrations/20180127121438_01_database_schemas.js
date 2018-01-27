exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('tweets', (table) => {
    table.increments('id').unsigned().primary();
    table.string('tweet_id', 100).nullable();
    table.timestamps(true, true);
    table.string('timestamp', 100).nullable();
    table.string('username', 100).nullable();
    table.string('profile_picture', 1000).nullable();
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
