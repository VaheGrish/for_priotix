exports.up = function (knex, Promise) {
    return knex.schema.hasTable('device_types').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('device_types', table => {
                table.increments("id").unsigned().primary();
                table.string("name", 32).notNullable();
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("device_types")
    ]);
};
