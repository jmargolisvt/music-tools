var mongoose = require('mongoose');
var setlistSchema = new mongoose.Schema({
  name: String,
  songArray: Object
});
mongoose.model('Setlist', setlistSchema);
