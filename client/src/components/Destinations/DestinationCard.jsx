import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';
import { SessionContext } from '../../context/SessionContext';

function DestinationCard({ destination, discount, onClick, clickCount }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext);
  const imageUrl = `http://localhost:3000/${destination.image}`;

  const handleCardClick = async () => {
    onClick();  
    const destinationId = destination._id;

    if (userInfo && userInfo.userId) {
      const userId = userInfo.userId;
      const token =  userInfo.token;

      try {
        const response = await fetch('http://localhost:3000/api/userAnalysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
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
    } else {
      console.log('User is not logged in.');
    }

    navigate(`/destinations/${destinationId}`);
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
