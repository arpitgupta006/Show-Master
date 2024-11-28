const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  showtime: { type: Date, required: true },
  ticketsAvailable: { type: Number, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);
