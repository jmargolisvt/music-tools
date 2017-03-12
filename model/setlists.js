var mongoose = require('mongoose');
var setlistSchema = new mongoose.Schema({
  name: String,
  songArray: Object,
  numSets: Number
});
mongoose.model('Setlist', setlistSchema);
