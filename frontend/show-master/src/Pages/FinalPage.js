import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FinalPage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FinalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get movie ID and booking details from Tickets Page
  const { movieId, selectedSeats, totalPrice } = location.state || {};

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      navigate("/"); // Redirect to home if no movie ID
      return;
    }

    // Fetch movie details by ID
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, navigate]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movieDetails || !selectedSeats) {
    return (
      <div className="error-page">
        <h2>Booking Information Not Found</h2>
        <button onClick={() => navigate(-1)} className="go-back-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="final-page">
      <div className="ticket">
        <h1>🎬 Movie Ticket 🎬</h1>
        <Row>
          <Col lg={6}>
            <div className="movie-info">
              <img
                src={movieDetails.image}
                alt={movieDetails.title}
                className="movie-poster"
              />
              <h2>{movieDetails.title}</h2>

            </div>
            <div className="ticket-details">
              <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
              <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            </div>

          </Col>
          <Col lg={6}>

            <div className="qr-code">
              <p>Scan this QR Code for Entry:</p>
              {/* Placeholder QR Code */}
              <img
                src="https://via.placeholder.com/150?text=QR+Code"
                alt="QR Code"
              />
            </div>
          </Col>
        </Row>



        <button className="go-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FinalPage;
