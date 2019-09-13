exports.up = function(knex) {
    return knex.schema
      .createTable('recipes', tbl => {
        tbl.increments();
  
        tbl.string('recipe', 255).notNullable();
        tbl.string('description', 255);
      })
      .createTable('ingredients', tbl => {
        tbl.increments();
        tbl.string('ingredient', 512).unique().notNullable();
      })
      .createTable('instructions', tbl => {
        tbl.increments();
  
        tbl.string('instruction', 255).notNullable();
  
        // Foreign Key
        tbl
          .integer('recipe_id')
          .unsigned()
          .references('id')
          .inTable('recipes')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
      })
      .createTable('recipe_ingredients', tbl => {
        tbl
          .integer('recipe_id')
          .unsigned()
          .references('id')
          .inTable('recipes')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
        tbl
          .integer('ingredient_id')
          .unsigned()
          .references('id')
          .inTable('ingredients')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
  
        tbl.primary(['recipe_id', 'ingredient_id']);
        tbl
          .float('quantity')
         tbl
         .string('unit',32)
          
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('recipe_ingredients')
      .dropTableIfExists('instructions')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('recipes');
  };  