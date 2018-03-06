exports.up = function (knex, Promise) {
    return knex.schema.hasTable('user_device_permissions').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('user_device_permissions', table => {
                table.increments("id").unsigned().primary();
                table.integer("user_id")
                    .unsigned().index()
                    .references("id")
                    .inTable("users")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                table.integer("device_id")
                    .unsigned().index()
                    .references("id")
                    .inTable("devices")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                table.integer("permission_id")
                    .unsigned().index()
                    .references("id")
                    .inTable("permissions")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("user_device_permissions")
    ]);
};