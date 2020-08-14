var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {
  res.send('this is register');
});

router.post('/login', function(req, res, next) {
  res.send('this is login');
});

module.exports = router;