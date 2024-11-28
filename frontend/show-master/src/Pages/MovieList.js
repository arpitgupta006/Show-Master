// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='mainDivList'>
      <div className="movie-container">
    <h1 className="text-center text-light my-4">Available Movies</h1>
    <div className="card-deck ">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card card">
          <img src={movie.image} alt={movie.title} className="card-img-top movie-image" />
          <div className="card-body">
            <h5 className="card-title text-light">{movie.title}</h5>
            <p className="card-text text-light">{movie.description}</p>
            <p className="card-text text-light">
              <strong>Showtime:</strong> {new Date(movie.showtime).toLocaleString()}
            </p>
            <p className="card-text text-light">
              <strong>Tickets Available:</strong> {movie.ticketsAvailable}
            </p>
            <Link to={`/movies/${movie._id}`} className="btn btn-danger text-light ">Check Out</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
    </div>
    
  );
};

export default MovieList;
