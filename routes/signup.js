var express = require('express');
var router = express.Router();
var http = require('http');
var usercontroller = require('../controllers/usercontroller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup' , {user: req.user});
});


module.exports = router;
