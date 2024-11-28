import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TicketsPage.css";

const seatPrices = { front: 10, middle: 12, back: 8 };

const TicketsPage = () => {
  const { id } = useParams(); // Movie ID from URL
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const seatMap = [
    { section: "front", rows: 2, seatsPerRow: 5 },
    { section: "middle", rows: 3, seatsPerRow: 5 },
    { section: "back", rows: 2, seatsPerRow: 5 },
  ];

  console.log(id)

  const handleSeatSelect = (section, seatNumber) => {
    const seatIdentifier = `${section}-${seatNumber}`;

    if (selectedSeats.includes(seatIdentifier)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIdentifier));
      setTotalPrice(totalPrice - seatPrices[section]);
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seatIdentifier]);
      setTotalPrice(totalPrice + seatPrices[section]);
    }
  };

  const handleBookNow = () => {
    navigate("/final", {
      state: {
        movieId: id,
        selectedSeats,
        totalPrice,
      },
    });
  };
  

  return (
    <div className="tickets-page">
      <h1 className="text-light">Select Your Seats</h1>
      <div className="seat-map">
        {seatMap.map(({ section, rows, seatsPerRow }) => (
          <div key={section} className="seat-section">
            <h2 className="text-light">{section.charAt(0).toUpperCase() + section.slice(1)} Section (${seatPrices[section]} per seat)</h2>
            <div className="seat-grid">
              {Array.from({ length: rows * seatsPerRow }, (_, index) => {
                const seatNumber = index + 1;
                const seatIdentifier = `${section}-${seatNumber}`;
                return (
                  <button
                    key={seatIdentifier}
                    className={`seat ${
                      selectedSeats.includes(seatIdentifier) ? "selected" : ""
                    }`}
                    onClick={() => handleSeatSelect(section, seatNumber)}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="booking-summary">
        <h2 className="text-light">Selected Seats: {selectedSeats.join(", ") || "None"}</h2>
        <h3 className="text-light">Total Price: ${totalPrice.toFixed(2)}</h3>
        <button  onClick={handleBookNow} className="book-now-btn">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TicketsPage;