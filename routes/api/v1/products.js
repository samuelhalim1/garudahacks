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
router.post('/search', async function(req, res, next) {
    var filter
    const body = req.body
    if(body.filters.length > 0) {
      filter = body.filters
    } else {
      const filterTemp = []
      filterTemp.push('fruit')
      filterTemp.push('vegetables')
      filterTemp.push('dairy')
      filterTemp.push('meat')
      filterTemp.push('Seafood')
      filterTemp.push("Wheat & Grain")
      filter = filterTemp
    }
    const snapshot = await db.collection('product')
    .where('price', '<=', body.priceMax)
    .where('price', '>=', body.priceMin)
    .where('category','in', filter)
    .get();
    if (snapshot.empty) {
        res.send("NO SERVERS AVAILABLE");
    } else {
      const result = []
      var docs = snapshot.docs.map(doc => doc.data())
      docs.forEach( doc => {
        if(doc.name.toLowerCase().includes(body.keyword.toLowerCase())) {
          result.push(doc)
        }
      })
      if(result.length > 0) {
        res.end(JSON.stringify(
          {
            status: 200,
            success: true,
            data: result
          }
        ));
      } else {
        res.end(JSON.stringify(
          {
            status: 200,
            success: false
          }
        ));
      }
    }
  });

  router.post('/item/', function(req, res, next) {
    res.json({
        success: true,
        result: req.body.bookId
    });
  });
module.exports = router;