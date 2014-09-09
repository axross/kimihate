var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var userSchema = new Schema({
  id:                 { type: Number, index: { unique: true } },
  username:           String,
  thumbUrl:           String,
  signupedAt:         Date,
  lastSigninedAt:     Date,
  twitterToken:       String,
  twitterTokenSecret: String,
  journals:           Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;
