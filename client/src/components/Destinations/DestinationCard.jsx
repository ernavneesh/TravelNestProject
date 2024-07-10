import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';
import { SessionContext } from '../../context/SessionContext';

function DestinationCard({ destination, onClick }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext);
  const imageUrl = `http://localhost:3000/${destination.image}`;

  const handleCardClick = async () => {
    onClick();  // Call the passed onClick function to handle click count
    if (userInfo && userInfo.userId) {
      const userId = userInfo.userId;
      const destinationId = destination._id;

      try {
        const response = await fetch('http://localhost:3000/api/userAnalysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, destinationId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Post response:', result);
      } catch (error) {
        console.error('Error posting data:', error);
      }

      navigate(`/destinations/${destinationId}`);  // Navigate to the destination details page
    } else {
      console.log('User is not logged in.');
    }
  };

  return (
    <div className="destination-card" onClick={handleCardClick}>
      <span className="tour-featured">Discount Available</span>
      <img src={imageUrl} alt={destination.destinationName} className="destination-image" />
      <div className='destination-info'>
        <h3>{destination.destinationName}</h3>
      </div>
    </div>
  );
}

export default DestinationCard;
