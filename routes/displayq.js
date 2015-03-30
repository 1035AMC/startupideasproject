var express = require('express');
var router = express.Router();
var request = require('request');
var S=require('string');


/* GET home page. */
router.post('/', function(req, res, next) {
    start = req.body.start;
    end = req.body.end;
    amount = req.body.amount
    start = S(start).replaceAll("/","-").s;

    console.log(start);
    end = S(end).replaceAll("/","-").s;
    console.log(end);

    request.get('http://localhost:3000/api/idea/topk/' + start + '/' + end + '/' + amount, {
        json: true
    }, function(request, response) {
        console.log(response.body);
        console.log('user:' + (req.user));
        res.render('displayq', {
            user: req.user,
            startupideas: response.body
        });
    });
})



module.exports = router;