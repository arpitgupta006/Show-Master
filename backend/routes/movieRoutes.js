const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post('/addmovies', async (req, res) => {
  const { title, description, showtime, ticketsAvailable } = req.body;
  const movie = new Movie({ title, description, showtime, ticketsAvailable });
  await movie.save();
  res.json(movie);
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Fetch movie by MongoDB Object ID
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
