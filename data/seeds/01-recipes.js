exports.seed = function(knex, Promise) {
    return knex('recipes').insert([
      {
        recipe_name: 'Bread',
        description: 'Loaves from flour for sandwiches',
      }, // 1
      {
        recipe_name: 'Apple Sauce',
        description: 'Mashed apples',
      }, // 2
    ]);
  };
  