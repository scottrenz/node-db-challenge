exports.seed = function(knex, Promise) {
    return knex('resources').insert([
      {
        id: 1,
        name: 'Scott',
        description: 'Myself',
      }, // 1
      {
        id: 2,
        name: 'Bed',
        description: 'Place to sleep',
      }, // 2
    ]);
  };
  