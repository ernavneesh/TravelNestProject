import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';

function DestinationCard({ destination, discount, onClick, clickCount }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:3000/${destination.image}`;

  const handleCardClick = () => {
    onClick();  // Call the passed onClick function to handle click count
    navigate(`/destinations/${destination._id}`);  // Navigate to the destination details page
  };

  const destinationDiscount = (discount && discount.length > 0) 
    ? discount.find(discount => discount.destinationId === destination._id) 
    : null;

  return (
    <div className="destination-card" onClick={handleCardClick}>
      {destinationDiscount && (
        <span className="tour-featured">
          {destinationDiscount.discountPercentage}% Discount Available 
        </span>
      )}
      <img src={imageUrl} alt={destination.destinationName} className="destination-image"/>
      <div className='destination-info'>
        <h3>{destination.destinationName}</h3>
      </div>
    </div>
  );
}

export default DestinationCard;
