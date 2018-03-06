
exports.seed = function(knex, Promise) {
  return knex('devices').del()
    .then(function () {
      return knex('devices').insert([
        {id: 1, name: 'Web Camera', device_type_id: 1},
        {id: 2, name: 'Notebook Camera', device_type_id: 1},
        {id: 3, name: 'Home Door', device_type_id: 1}
      ]);
    });
};
