exports.seed = function (knex, Promise) {
    return knex('device_types').del()
        .then(function () {
            return knex('device_types').insert([
                {id: 1, name: 'camera'},
                {id: 2, name: 'door'},
                {id: 3, name: 'lamp'}
            ]);
        });
};
