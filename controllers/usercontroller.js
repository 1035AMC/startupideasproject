var User= require('../models/user.js');

exports.postUser = function(req, res) {
    var userModel = new User(req.body);
    userModel.save(function(err, user) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: 'Error ocourred',
                body: req.body
            });
        } else if (user) {
            res.json({
                type: true,
                data: user
            });
        } 
    });
};

exports.getUsers = function(req, res) {
    User.find().lean().exec(function(err, data) {
        if (err) {
            res.json("An error has ")
        } else if (data) {
            res.json(data);
        }
    });

};

exports.getUser = function(req, res) {
    User.findById(req.params.userid, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });

};

exports.putUser = function(req, res, next) {
    var updatedUserModel = new User(req.body);
    //lets find the user that we want to update
    User.findByIdAndUpdate(new ObjectId(req.params.userid), updatedUserModel, function(err, user) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured" + err
            });
        } else if (user) {
            res.json({
                type: true,
                data: user
            });
        } else {
            res.json({
                type: false,
                data: "Could not find " + req.params.userid
            });
        }
    });
};

exports.deleteUser = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  User.findByIdAndRemove(req.params.userid, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed!' });
  });
};

exports.signin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.oauthCallback = function(strategy) {
    return function(req, res, next) {
        passport.authenticate(strategy, function(err, user, redirectURL) {
            if (err || !user) {
                return res.redirect('/signin');
            }
            req.login(user, function(err) {
                if (err) {
                    return res.redirect('/signin');
                }

                return res.redirect(redirectURL || '/');
            });
        })(req, res, next);
    };
};
