var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var startupIdeasSchema = new Schema({
  name: String,
  username: { type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  info: {type: String, required: true},
  industry : String,
  keywords : [String],
  vote : {type: Number, default: 0}
});

// startupIdeasSchema.pre('save', function(next){
//   now = new Date();
//   this.updated_at = now;
//   if ( !this.created_at ) {
//     this.created_at = now;
//   }
// });



// the schema is useless so far
// we need to create a model using it
var startupIdeas = mongoose.model('startupIdeas', startupIdeasSchema);

// make this available to our users in our Node applications
module.exports = startupIdeas;
