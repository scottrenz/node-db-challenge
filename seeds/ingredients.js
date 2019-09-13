
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, ingredient: 'Flour'},
        {id: 2, ingredient: 'Water'},
        {id: 3, ingredient: 'Apple'}
      ]);
    });
};
