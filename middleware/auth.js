const bcrypt = require('bcryptjs');

const db = require('../users/users-model');
const errorRef = require('../middleware/errorRef');

const auth = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(errorRef(error));
      });
  } else {
    res.status(400).json({
      message: 'Please provide credentials'
    });
  }
}

module.exports = auth;
