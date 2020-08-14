var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is get product');
});
router.get('/:id?', function(req, res, next) {
  res.json({
        success: true,
        result: req.params.id
    });
});
router.post('/', function(req, res, next) {
    res.json({
        success: true,
        result: "This is Post method"
    });
  });

  router.post('/item/', function(req, res, next) {
    res.json({
        success: true,
        result: req.body.bookId
    });
  });
module.exports = router;