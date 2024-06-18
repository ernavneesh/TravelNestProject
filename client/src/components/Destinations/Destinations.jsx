import React, { useState, useContext } from 'react';
import DestinationCard from './DestinationCard';
import Search from '../Search/Search';
import './Destinations.css';

const destinationsData = [
  {
    name: 'Vietnam',
    price: '$1000',
    imageUrl: 'https://vilandtravel.com/wp-content/uploads/2023/03/ha-noi-old-street-house-viland-travel-650x1024.png.webp',
  },
  {
    name: 'Laos',
    price: '$800',
    imageUrl: 'https://vilandtravel.com/wp-content/uploads/2023/03/luang-prabang-kuang-si-waterfall-viland-travel-1-2-684x1024.png.webp',
  },
  {
    name: 'Cambodia',
    price: '$900',
    imageUrl: 'https://vilandtravel.com/wp-content/uploads/2023/03/siem-reap-victory-gate-viland-travel-683x1024.png.webp',
  },
  {
    name: 'Thailand',
    price: '$1200',
    imageUrl: 'https://vilandtravel.com/wp-content/uploads/2023/03/thailand-wat-phra-bat-ming-mueang-worawihan-viland-travel-768x1024.png.webp',
  },
];

function Destinations() {
  const [clickCounts, setClickCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (destinationName) => {
    setClickCounts((prevCounts) => {
      const newCount = (prevCounts[destinationName] || 0) + 1;
      console.log(` clicked on ${destinationName}, Click count: ${newCount}`);
      return { ...prevCounts, [destinationName]: newCount };
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredDestinations = destinationsData.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={handleSearch} /><br/>
      <div className="destinations">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
              onClick={handleCardClick}
              clickCount={clickCounts[destination.name]}
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
