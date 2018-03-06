exports.up = function (knex, Promise) {
    return knex.schema.hasTable('users').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments("id").unsigned().primary();
                table.string("first_name", 32).notNullable();
                table.string("last_name", 32).notNullable();
                table.string("email", 128).notNullable();
                table.string("password").notNullable();
                table.string("role").notNullable();
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("users")
    ]);
};
