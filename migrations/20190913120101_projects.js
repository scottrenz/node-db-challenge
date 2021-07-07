exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
        tbl.increments();
  
        tbl.string('name', 255).unique().notNullable();
        tbl.string('description', 255);
        tbl.boolean('completed', 255).notNullable().default(false);
      })
      .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('name', 255).unique().notNullable();
        tbl.string('description', 512);
      })
      .createTable('tasks', tbl => {
        tbl.increments();
  
        tbl.string('description', 255).notNullable();
        tbl.string('note', 255);
        tbl.boolean('completed', 255).notNullable().default(false);
  
        // Foreign Key
        tbl
          .integer('project_id')
          .unsigned()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
      })
      .createTable('project_resources', tbl => {
        tbl
          .integer('project_id')
          .unsigned()
          .references('id')
          .inTable('recipes')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
        tbl
          .integer('resource_id')
          .unsigned()
          .references('id')
          .inTable('resources')
          .onDelete('CASCADE') // if the PK record is deleted
          .onUpdate('CASCADE'); // if the PK value updates
  
        tbl.primary(['project_id', 'resource_id']);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };  