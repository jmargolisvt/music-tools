var mongoose = require('mongoose');
var songSchema = new mongoose.Schema({
  name: { type : String, unique: true },
  artist: String,
  time: String,
  chart: String
});
mongoose.model('Song', songSchema);
