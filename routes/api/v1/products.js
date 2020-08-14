var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const snapshot = await db.collection('product').get();
  if (snapshot.empty) {
        res.send("NO SERVERS AVAILABLE");
  } else {
    var docs = snapshot.docs.map(doc => doc.data());
    console.log('Document data:', docs);
    res.end(JSON.stringify(
      {
        status: 200,
        success: true,
        data: docs
      }
    ));
  }
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