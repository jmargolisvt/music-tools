var mongoose = require('mongoose');
var songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  chart: String
});
mongoose.model('Song', songSchema);
