
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, recipe: 'Bread', description: 'Good for slicing up and putting food between slices and eating'},
        {id: 2, recipe: 'Apple Sauce', description: 'Mashed up apples good for slurping up into your mouth and swallowing'},
      ]);
    });
};
