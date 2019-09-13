
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, instruction: 'Put flour into bowl of water', recipe_id: 1},
        {id: 2, instruction: 'Mix', recipe_id: 1},
        {id: 3, instruction: 'Take out of bowl and shape into a loaf', recipe_id: 1},
        {id: 4, instruction: 'Put in a pan and put in the oven at 500 degrees for an hour', recipe_id: 1},
        {id: 5, instruction: 'Take out of oven and slice bread and put stuff between two slices and eat', recipe_id: 1},
        {id: 6, instruction: 'Mash up apples', recipe_id: 2},
        {id: 7, instruction: 'Put in jar and scoop out of jar when you feel like it and eat', recipe_id: 2},
      ]);
    });
};
