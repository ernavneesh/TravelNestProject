import React, { useState, useEffect, useContext } from 'react'; 
import DestinationCard from './DestinationCard';
import Search from '../Search/Search';
import './Destinations.css';
import { SessionContext } from '../../context/SessionContext'; 

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [clickCounts, setClickCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [discount, setDiscount] = useState(null);
  const { userInfo } = useContext(SessionContext); 

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

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        if (userInfo) {
          const userId = userInfo.userId;
          const token =  userInfo.token;
          const response = await fetch(`http://localhost:3000/api/discount/active-discounts/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `${token}`,
          }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setDiscount(data);
        }
      } catch (error) {
        console.error('Error fetching discount:', error);
      }
    };

    fetchDiscount();
  }, [userInfo]);

  const handleCardClick = (destinationId) => {
    setClickCounts((prevCounts) => {
      const newCount = (prevCounts[destinationId] || 0) + 1;
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
              discount={discount}
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
