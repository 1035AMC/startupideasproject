var startUpIdeas = require('../models/startupIdeas.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId();

exports.postIdea = function(req, res, next) {
    req.body.keywords = req.body.keywords.split(/[\s,]+/);
    var StartUpModel = new startUpIdeas(req.body);

    StartUpModel.save(function(err, user) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: 'Error ocourred' + err
            });
        } else if (user) {
            res.json({
                type: true,
                data: user
            });
        } else {
            res.json({
                type: false,
                data: "Could not find" + req.params.startupid
            });
        }
    });
}
exports.getIdeas = function(req, res, next) {
    startUpIdeas.find().lean().exec(function(err, data) {
        if (err) {
            res.json(err);
        } else if (data) {
            res.json(data);
        }
    });
}

exports.getMyIdeas= function(req, res, next) {
    startUpIdeas.find(req.params.userid).lean().exec(function(err, data) {
        if (err) {
            res.json(err);
        } else if (data) {
            res.json(data);
        }
    });
}

exports.getIdea = function(req, res, next) {
    startUpIdeas.findById(req.params.startupid, function(err, data) {
        res.json(data);
    });
}

exports.putIdea = function(req, res, next) {
    startUpIdeas.findById(req.params.startupid, function(err, startup) {

        if (err)
            res.send(err);


        if (req.body.info) {
            startup.info = req.body.info;
        }
        if (req.body.industry) {
            startup.industry = req.body.industry;
        }
        if (req.body.keywords) {
            console.log("Setting keywords: " + req.body.keywords);
            startup.keywords = req.body.keywords.split(/[\s,]+/);
        }


        startup.save(function(err) {
            if (err) {
                console.log("ERROR OCCURRED: " + err);
                res.send(err);
                return;
            }

            res.json({
                message: startup
            });
        });

    });
}

exports.vote = function(req, res) {
    startUpIdeas.findById(req.params.startupid, function(err, startup) {
        //voooooteeeeeeeeee
        if (req.body.vote === "upvote") {
            startup.vote = startup.vote + 1;
        } else {
            startup.vote = startup.vote - 1;
        }

        startup.save(function(err) {
            if (err) {
                console.log("ERROR OCCURRED: " + err);
                res.send(err);
                return;
            }

            res.json({
                message: startup.votes
            });
        });
    });
};

exports.deleteIdea = function(req, res) {

    startUpIdeas.findByIdAndRemove(req.params.startupid, function(err) {
        if (err)
            res.json(err);

        res.json({
            message: 'Idea removed!'
        });
    });
};


exports.topKideas = function(req, res) {
    console.log(req.body);
    startUpIdeas.find({
            "created_at": {
                '$gte': new Date(req.params.start),
                '$lte': new Date(req.params.end)
            }
        })
        .sort('-vote').limit(parseInt(req.params.amount)).lean()
        .exec(function(err, data) {
            if (err) {
                res.json(err);
            } else if (data) {
                res.json(data);
            }
        });
}

exports.graph = function(req, res, next) {
    startUpIdeas.find().sort('-vote').lean().exec(function(err, data) {
        if (err) {
            res.json(err);
        } else if (data) {
            res.json(data);
        }
    });
}
