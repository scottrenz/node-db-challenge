
exports.seed = function(knex, Promise) {
  return knex('recipe_ingredients').insert([
    { recipe_id: 1, ingredient_id: 1, quantity: 5, unit: 'cup' },
    { recipe_id: 1, ingredient_id: 2, quantity: 6, unit: 'cup' },
    { recipe_id: 2, ingredient_id: 1, quantity: 8, unit: 'whole' },
  ]);
};
