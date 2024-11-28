import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieInfoPage.css";
import { useNavigate, useParams } from 'react-router-dom';

const MovieInfoPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/movies/${id}`);
                setMovie(response.data);
                console.log("movie" ,response.data)
                console.log("movie id" ,movie._id)
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        fetchMovie();
    }, [id]);

    const handleBookNow = () => {
      navigate(`/tickets/${movie._id}`); // Replace `movie.id` with your movie's unique identifier
    };

    if (!movie) return <p>Loading movie details...</p>;

    return (
        <div className="movie-info-page" style={{ backgroundImage: `url(${movie.image})` }}>
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <h3>Showtime: {new Date(movie.showtime).toLocaleString()}</h3>
          <h4>Director: {movie.director}</h4>
          <img src={movie.directorImage} alt={`${movie.director} photo`} className="director-image" />
  
          <h4>Cast:</h4>
          <div className="cast-list">
            {movie.cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <img src={movie.castImages[index]} alt={`${actor} photo`} className="cast-image" />
                <p>{actor}</p>
              </div>
            ))}
          </div> 
          <button onClick={handleBookNow} className="book-button">   Book Now
          </button>
        </div>
      </div>
    );
  }

export default MovieInfoPage;
