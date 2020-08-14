var express = require('express');
var router = express.Router();
var userApiRouter = require('./api/v1/users')
var productApiRouter = require('./api/v1/products')

router.use('/user', userApiRouter)
router.use('/product', productApiRouter)

module.exports = router;
