var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {


    request.get('http://localhost:3000/api/ideas/graph', {
        json: true
    }, function(request, response) {
        // we are getting five objects so we can simply do 5 pushes and arrange the information exactly how we 
        //want it to be displayed
        console.log(response.body.length);
        if (req.user) {
            res.render('graphtop5', {
                user: req.user,
                data: response.body
            });
        }
        else{
            res.redirect('/login');
        }
    })
})


module.exports = router;