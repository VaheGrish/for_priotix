exports.seed = function (knex, Promise) {
    return knex('permissions').del()
        .then(function () {
            return knex('permissions').insert([
                {id: 1, name: 'start'},
                {id: 2, name: 'stop'},
                {id: 3, name: 'restart'}
            ]);
        });
};
