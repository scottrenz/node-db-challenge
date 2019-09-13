const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
  db('projects')
  .then(projects => {
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
  db('project_tasks')
  .then(results => {
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
  db('project_tasks')
  .where({ project_id: req.params.id })
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

server.put('/api/projects/:id', (req, res) => {
  console.log('projects body',req.body)
  db('projects')
  .update(req.body)
  .where({ id: req.params.id })
  .then(results => {
    console.log('instru',results,results.length)
    if(results)
    res.status(200).json(req.body);
    else
    res.status(500).json('invalid project ID');
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
  db('projects').insert(req.body)
  .then(ids => {
    const id = ids[0];

    db('projects')
      .where({ id })
      .first()
    .then(project => {
      res.status(201).json(project);
    });
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
    console.log('count',count)
    if (count > 0) {
      console.log('got here')
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
