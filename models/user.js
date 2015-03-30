var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , SALT_WORK_FACTOR = 10;
var passportLocalMongoose = require('passport-local-mongoose');


var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  email: String,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

// userSchema.pre('save', function(next) {
//   var user = this;
//   var currentDate = new Date();
//   this.update_at = currentDate;
//   if (!this.created_at)
//     this.created_at = currentDate;

//   //if the password has not been modified go to the next method
//   if (!user.isModified('password')) return next();

//   //otherwise modify the password here
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if(err) return next(err);
//     //hash the password and then 
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if(err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });


//   });


// userSchema.methods.verifyPassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if(err) return cb(err);
//     cb(null, isMatch);
//   });
// };

userSchema.plugin(passportLocalMongoose);


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
