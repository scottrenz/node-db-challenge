const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/recipes', (req, res) => {
  // get all species from the database
  db('recipes')
  .then(recipes => {
    res.status(200).json(recipes);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

server.get('/api/instructions', (req, res) => {
  db('recipe_instructions')
  .then(instructions => {
    res.status(200).json(instructions);
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
