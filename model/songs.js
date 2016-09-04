var mongoose = require('mongoose');
var songSchema = new mongoose.Schema({
  name: String,
  artist: String
});
mongoose.model('Song', songSchema);
