exports.seed = function(knex, Promise) {
    return knex('tasks').insert([
        { description: 'Open eyes', note: 'Not too fast', project_id: 1 },
        { description: 'Get out of bed', note: 'slowly', project_id: 1 },
        { description: 'Lay in bed', note: 'clothing optional', project_id: 2 },
        { description: 'Close eyes', note: 'at your own chosen speed', project_id: 2 },
    ]);
  };
  