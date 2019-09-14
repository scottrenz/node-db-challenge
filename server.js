const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
  function makebool (item,ix,arr){
item.completed = item.completed ? true : false
  }
  db('projects')
  .then(projects => {
    projects.map(makebool)
    res.status(200).json(projects);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/resources', (req, res) => {
  db('resources')
  .then(projects => {
    res.status(200).json(projects);
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
    res.status(500).json('no tasks and resources for a project with this ID');

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

server.get('/api/projects/tasks', (req, res) => {
  function makebool (item,ix,arr){
    item.project_completed = item.project_completed ? true : false
    item.task_completed = item.task_completed ? true : false
      }
    
  db('project_tasks')
  .then(results => {
    results.map(makebool)
    res.status(200).json(results);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});
server.get('/api/projects/resources', (req, res) => {
  db('projectresources')
  .then(results => {
    res.status(200).json(results);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/projects/:id/tasks', (req, res) => {
  function makebool (item,ix,arr){
    item.project_completed = item.project_completed ? true : false
    item.task_completed = item.task_completed ? true : false
      }
    db('project_tasks')
  .where({ project_id: req.params.id })
  .then(results => {
    if(results.length > 0)
{
  results.map(makebool)
      res.status(200).json(results);
}
      else
    res.status(500).json('invalid project ID');
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.put('/api/projects/:id', (req, res) => {
  let name = req.body.name
  let description = req.body.description
  let completed = req.body.completed
  let s = ''
  if(typeof(name) === 'string')
{
  name = name.replace(/'/g,"''")
  s = ` name = '${name}'`
}
  if(typeof(description) === 'string')
  {
    description = description.replace(/'/g,"''")
  s = `${s} ${typeof(name) === 'string' ? ',' : ''}  description = '${description}'`
  }
  if(typeof(completed) === 'boolean')
  s = `${s} ${(typeof(name) === 'string' || typeof(description) === 'string') ? ',' : ''} completed = ${completed ? 1 : 0}`

  db.raw(`update projects set ${s} where id = ${req.params.id} and
  '${name}' not in (select name from projects where id <> ${req.params.id})`)
  .then(results => {
    db('projects').where({id: req.params.id})
    .then(results => {
      if(results)
      {
      results[0].completed = results[0].completed ? true : false  
      res.status(200).json(results);
      }
      else
      res.status(500).json('invalid update paramater');
  
    })
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/projects/:id/resources', (req, res) => {
  db('projectresources')
  .where({ project_p_id: req.params.id })
  .then(results => {
    if(results.length > 0)
    res.status(200).json(results);
    else
    res.status(500).json('invalid project ID');
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.post('/api/projects', (req, res) => {
db('projects').where({name: req.body.name})
.then(name => {
  if(name[0].name === req.body.name)
  {
    req.body.name = null
  }
})
  db('projects').insert(req.body)
  .then(ids => {
    const id = ids[0];
    db('projects')
      .where({ id })
      .first()
    .then(project => {
   project.completed = project.completed ? true : false
      res.status(201).json(project);
    })
  
  })

  .catch(error => {
    res.status(500).json(error);
  });
});

server.delete('/api/project/:id', (req, res) => {
  db('projects')
    .where({ id: req.params.id })
    .del()
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: `deleted ${count} project${count >1 ? 's' : ''} with ID ${req.params.id}` });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = server;
