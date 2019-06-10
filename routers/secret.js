const express = require('express');

const auth = require('../middleware/auth');
const router = express.Router();
router.use(auth);

router.get('/', (req, res) => {
  res.json({
    message: "Shhh these routes are secret",
  });
});

router.get('/jamie', (req, res) => {
  res.json({
    message: "Jamie is an amazing PM!",
  });
});

router.get('/web19/:name', (req, res) => {
  res.json({
    message: `${req.params.name} is an awesome student in Web 19!`,
  });
});

module.exports = router;
