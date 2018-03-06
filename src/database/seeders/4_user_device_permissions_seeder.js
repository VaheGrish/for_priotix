exports.seed = function (knex, Promise) {
    return knex('user_device_permissions').del()
        .then(function () {
            return knex('user_device_permissions').insert([
                {id: 1, user_id: 2, device_id: 1, permission_id: 1},
                {id: 2, user_id: 2, device_id: 2, permission_id: 2},
                {id: 3, user_id: 2, device_id: 3, permission_id: 2},
                {id: 4, user_id: 2, device_id: 3, permission_id: 3}
            ]);
        });
};
