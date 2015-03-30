var express = require('express');
var router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
// configure the app to use bodyParser()



/* GET home page. */
router.get('/', function(req, res, next) {
    //preparing the get request
    request.get('http://localhost:3000/api/ideas/', {
        json: true
    }, function(error, response) {
        console.log(response.body);
        console.log('values: ' + typeof(response.body));
        console.log('user:' + typeof(req.user));

        res.render("index", {
            startupideas: response.body,
            user: req.user
        });
    });
});

module.exports = router;