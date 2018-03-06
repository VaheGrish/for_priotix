exports.up = function (knex, Promise) {
    return knex.schema.hasTable('devices').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('devices', table => {
                table.increments("id").unsigned().primary();
                table.string("name", 32).notNullable();
                table.integer("device_type_id")
                    .unsigned().index()
                    .references("id")
                    .inTable("device_types")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("devices")
    ]);
};