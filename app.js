//get dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var session = require('express-session');
var methodOverride = require('method-override');


//----------------------routes---------------------
var routes = require('./routes/index');
var user = require('./routes/user');
var signup = require('./routes/signup');
var makeidea = require('./routes/makeidea.js');
var startupidea = require('./routes/startupidea.js');
var login = require('./routes/login');
var User = require('./models/user.js');
var querydates = require('./routes/querydates.js')
var displayq = require('./routes/displayq.js')
var graphtop5 = require('./routes/graphtop5.js')
var myideas = require('./routes/myideas.js')

//-----------------------controllers--------------

//these guys work as api endpoints
var usercontroller = require('./controllers/usercontroller.js');
var ideacontroller = require('./controllers/ideacontroller.js');
var router = express.Router();


var app = express();

//PASSPORT STUFF
//--------------------------------------------




//----------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var router = express.Router();

mongoose.connect('mongodb://localhost/individualproject');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('Insert secret here'));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

var authSerializer = function(user, done) {
    done(null, user.id);
};

var authDeserializer = function(id, done) {
    User.findById(id, function(error, user) {
        done(error, user);
    });
};

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);



app.use(express.static(path.join(__dirname, 'public')));

router.route('/users')
    .post(usercontroller.postUser)
    .get(usercontroller.getUsers);

router.route('/user/:userid')
    .put(usercontroller.putUser)
    .get(usercontroller.getUser)
    .delete(usercontroller.deleteUser);

router.route('/ideas')
    .post(ideacontroller.postIdea)
    .get(ideacontroller.getIdeas);

router.route('/idea/:startupid')
    .put( ideacontroller.putIdea)
    .get(ideacontroller.getIdea)
    .delete(ideacontroller.deleteIdea);

router.route('/idea/vote/:startupid').put(ideacontroller.vote);
router.route('/idea/topk/:start/:end/:amount').get(ideacontroller.topKideas);
router.route('/ideas/graph').get(ideacontroller.graph);
router.route('/ideas/getMyIdeas/:userid').get(ideacontroller.getMyIdeas);

//Handle signing up a user


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/'); 
  });
});

app.use('/', routes);
app.use('/user', user);
app.use('/signup', signup);
app.use('/login', login);
app.use('/makeidea',makeidea);
app.use('/startupidea',startupidea);
app.use('/querydates',querydates);
app.use('/displayq',displayq);
app.use('/graphtop5',graphtop5);
app.use('/myideas',myideas);


app.post('/signup', function(req, res) {
    User.register(new User(req.body), req.body.password, function(err, username) {
        if (err) {
          //if an error occours we redirect to signup again
            return res.redirect('/signup');
        }
        //otherwise authenticate the user and then redirect
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

app.use('/api', router);




module.exports = app;