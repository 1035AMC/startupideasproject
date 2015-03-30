var express = require('express');
var router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render("makeidea", {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
});
router.post('/', function(req, res, next) {
    if (req.user) {
        var formData = req.body;
        formData.username = req.user.username;
        console.log(formData);
        request.post('http://localhost:3000/api/ideas').form(formData);
        res.redirect('/');
    } else {
        res.redirect('/login');
    }

});

module.exports = router;