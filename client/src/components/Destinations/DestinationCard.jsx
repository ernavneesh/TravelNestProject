import React from 'react';
import './DestinationCard.css';

function DestinationCard({ destination, onClick, clickCount }) {
  const imageUrl = `http://localhost:3000/${destination.image}`;

  return (
    <div className="destination-card" onClick={onClick}>
      <img src={imageUrl} alt={destination.destinationName} className="destination-image"/>
      <div className='destination-info'>
        <h3>{destination.destinationName}</h3>
      </div>
    </div>
  );
}

export default DestinationCard;
