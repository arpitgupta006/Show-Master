const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userName: { type: String, required: true },
  seats: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
