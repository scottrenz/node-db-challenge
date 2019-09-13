exports.seed = function(knex, Promise) {
    return knex('instructions').insert([
      // species_id must match valid species
      { insruction: 'Put flour in water', recipe_id: 1 },
      { instruction: 'mix', recipe_id: 1 },
      { instruction: 'put blob into oven at 400 degrees for one hour', recipe_id: 1 },
      { instruction: 'remove from oven, slice, put stuff between slices, eat', recipe_id: 1 },
      { instruction: 'mash up apples', recipe_id: 2 },
      { instruction: 'put mashed apples in jar', recipe_id: 1 },
    ]);
  };
  