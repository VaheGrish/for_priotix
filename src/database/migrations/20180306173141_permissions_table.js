exports.up = function (knex, permissions) {
    return knex.schema.hasTable('permissions').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('permissions', table => {
                table.increments("id").unsigned().primary();
                table.string("name", 32).notNullable();
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("permissions")
    ]);
};
