exports.seed = function(knex, Promise) {
    return knex('projects').insert([
      {
        id: 1,
        name: 'WakeUp',
        description: 'Getting up in the morning',
        completed: false
      }, // 1
      {
        id: 2,
        name: 'Sleep',
        description: 'Getting self to bed',
        completed: false
      }, // 2
    ]);
  };
  