const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../data/users-model');
const validateBody = require('../middleware/validateBody');

router.post('/register', validateBody({
  username: {
    type: 'string',
    require: 'true',
  },
  password: {
    type: 'string',
    require: 'true',
  },
}), (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!, have a cookie` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/logout', (req, res) => {
  if (req.session && req.session.username) {
    req.session.destroy();
  }
  res.json({
    message: 'You have been logged out.',
  });
});

module.exports = router;
