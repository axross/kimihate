var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var entrySchema = new Schema({
  id:          { type: Number, index: { unique: true } },
  title:       String,
  url:         String,
  stars:       Number,
  description: String,
  date:        Date,
  thumbUrl:    String,
  tags:        Array
});

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
