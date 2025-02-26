const bcrypt = require('bcryptjs');

const db = require('../data/users-model');
const errorRef = require('../helpers/errorRef');

const auth = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({
      message: 'Invalid Credentials',
    });
  }

  // const { username, password } = req.headers;

  // if (username && password) {
  //   db.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json(errorRef(error));
  //     });
  // } else {
  //   res.status(400).json({
  //     message: 'Please provide credentials'
  //   });
  // }
}

module.exports = auth;
