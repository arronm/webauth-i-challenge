const express = require('express');

const db = require('../data/users-model.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
