exports.seed = function(knex, Promise) {
    return knex('ingredients').insert([
      {
        ingredient_name: 'Flour'
      }, // 1
      {
        ingredient_name: 'Apple'
      }, // 2
      {
        ingredient_name: 'Water'
      }, // 3
    ]);
  };
  