var express = require('express');
var router = express.Router();
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');


/* GET home page. */
router.get('/:startupid', function(req, res, next) {
    if (req.user) {
        //call the end point and what ever values we get back from it we use to format the page
        request.get('http://localhost:3000/api/idea/'+req.params.startupid,{json: true}, function(error, response) {
            console.log(response.body);
            res.render('startupidea', {user: req.user, startupidea: response.body});
        });
    } else {
        res.redirect('/login');
    }
});


router.get('/edit/:startupid', function(req, res, next) {
    if (req.user) {
        //call the end point and what ever values we get back from it we use to format the page
        request.get('http://localhost:3000/api/idea/'+req.params.startupid,{json: true}, function(error, response) {
            console.log(response.body);
            res.render('editidea', {user: req.user, startupidea: response.body});
        });
    } else {
        res.redirect('/login');
    }
});



router.post('/edit/:startupid', function(req, res) {
    if (req.user) {
        //call the end point and what ever values we get back from it we use to format the page

        request.put('http://localhost:3000/api/idea/' + req.params.startupid, {form: req.body}, function(error, response) {
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/delete/:startupid',function(req,res){
    if(req.user){
        request.del('http://localhost:3000/api/idea/' + req.params.startupid,function(req,response){
            res.redirect('/');
        });
    }
    else{
        res.redirect('/login');
    }
});


module.exports = router;