// Destinations.jsx
import React, { useState, useEffect } from 'react';
import DestinationCard from './DestinationCard';
import Search from '../Search/Search';
import './Destinations.css';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [clickCounts, setClickCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/destination');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (destinationId) => {
    setClickCounts((prevCounts) => {
      const newCount = (prevCounts[destinationId] || 0) + 1;
      console.log(`Clicked on destination with ID ${destinationId}, Click count: ${newCount}`);
      return { ...prevCounts, [destinationId]: newCount };
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredDestinations = destinations.filter((destination) =>
    destination.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={handleSearch} /><br/>
      <div className="destinations">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
              onClick={() => handleCardClick(destination._id)}
              clickCount={clickCounts[destination._id]}
            />
          ))
        ) : (
          <p>Sorry, we are not providing for that location.</p>
        )}
      </div>
    </div>
  );
}

export default Destinations;
