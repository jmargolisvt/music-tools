var mongoose = require('mongoose');
var setlistSchema = new mongoose.Schema({
  name: String,
  songArray: Object,
  numSets: Number,
  date: Date
});
mongoose.model('Setlist', setlistSchema);
