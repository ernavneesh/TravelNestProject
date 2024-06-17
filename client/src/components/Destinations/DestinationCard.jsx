import React from 'react';
import './DestinationCard.css';

function DestinationCard({ destination, onClick, clickCount }) {
  return (
    <div className="destination-card" onClick={() => onClick(destination.name)}>
      <img src={destination.imageUrl} alt={destination.name} className="destination-image" />
      <div className="destination-info">
        <h3>{destination.name}</h3>
        <p>Price per person: {destination.price}</p>
        {clickCount !== undefined && (
          <p className="click-count">Clicked: {clickCount} times</p>
        )}
      </div>
    </div>
  );
}

export default DestinationCard;
