var mongoose = require('mongoose');
var setlistSchema = new mongoose.Schema({
  name: String,
  songArray: Array
});
mongoose.model('Setlist', setlistSchema);
