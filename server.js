const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
  // get all species from the database
  db('projects')
  .then(recipes => {
    res.status(200).json(recipes);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/projects/tasks/resources/:id', (req, res) => {
  db('projecttaskresources')
  .where({ project_id: req.params.id })
  .then(ptr => {

    const task = []
    const resource = []

    function gettask (item,ix,arr) {
      let ok = true
      for (let i=0;  i < ix; i++ )
{      if(ptr[ix].task_id === ptr[i].task_id )
        ok = false
}
      if(ok)
      {
      task.push(
       {
         id : ptr[ix]["task_id"],
         description: ptr[ix]["task_description"],
         note: ptr[ix].task_note,
         completed: ptr[ix]["task_completed"] ? true : false
        }
      ) 
      }
      ok = true
      for (let i=0;  i < ix; i++ )
{      if(ptr[ix].resource_p_id === ptr[i].resource_p_id )
        ok = false
}
      if(ok)
      {
      resource.push(
       {
         id : ptr[ix]["resource_p_id"],
         name: ptr[ix]["resource_p_name"],
         description: ptr[ix]["resource_p_description"],
        }
      ) 
      }
            
}
    if(ptr.length === 0)
  {
    res.status(500).json('id not found');

  }
  else
  {
    const results =
    { id: ptr[0].project_id,
      name: ptr[0].project_name,
      completed: ptr[0].project_completed ? true : false,
    tasks: task,
    resources: resource
    }
    ptr.map(gettask)

    res.status(200).json(results);
}  
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/shoppinglist', (req, res) => {
  db('shoppinglist')
  .then(instructions => {
    res.status(200).json(instructions);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});
server.get('/api/ingredients/:id/recipes', (req, res) => {
  db('shoppinglist')
  .where({ ingredient_id: req.params.id })
  .then(instructions => {
    if(instructions.length > 0)
    res.status(200).json(instructions);
    else
    res.status(500).json('invalid ingredient ID');
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// create animal
server.post('/api/recipes', (req, res) => {
  db('recipes').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('recipes')
      .where({ id })
      .first()
    .then(recipe => {
      res.status(201).json(recipe);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// remove species
server.delete('/api/recipe/:id', (req, res) => {
  db('recipes')
    .where({ id: req.params.id })
    .del()
  .then(count => {
    console.log('count',count)
    if (count > 0) {
      console.log('got here')
      res.status(200).json({ message: `deleted ${count} recipe${count >1 ? 's' : ''} with ID ${req.params.id}` });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = server;
