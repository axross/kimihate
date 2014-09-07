var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var eventSchema = new Schema({
  id:              { type: Number, index: { unique: true } },
  title:           String,
  url:             String,
  description:     String,
  date:            Date,
  nowParticipants: Number,
  maxParticipants: Number,
  venue:           String,
  tags:            Array
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
