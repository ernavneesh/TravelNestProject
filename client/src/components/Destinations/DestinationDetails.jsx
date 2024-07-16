import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DestinationDetails.css';
import { SessionContext } from '../../context/SessionContext';


function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('days'); // Default sort by number of days
  const { userInfo } = useContext(SessionContext);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/destination/${id}`);
        const data = await response.json();
        setDestination(data);
        console.log("Dest", data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/package`);
        const data = await response.json();

        const filteredPackages = data.filter(pkg => pkg.destinationId === id);
        setPackages(filteredPackages);
        console.log("Packages :", filteredPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchDestination();
    fetchPackages();
  }, [id]);

  const sortPackages = (packages, criteria) => {
    return [...packages].sort((a, b) => {
      if (criteria === 'days') {
        return parseInt(a.noOfDays) - parseInt(b.noOfDays);
      } else if (criteria === 'price') {
        return parseFloat(a.amountPerPerson.replace(/[^\d.-]/g, '')) - parseFloat(b.amountPerPerson.replace(/[^\d.-]/g, ''));
      }
      return 0;
    });
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handlePackageClick = async (pkg) => {
    if (userInfo && userInfo.userId) {
      const userId = userInfo.userId;
      const destinationId = id;

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
    }

    navigate(`/packages/${pkg._id}`); // Navigate to the package details page
  };

  if (!destination) {
    return <div>Loading...</div>;
  }

  const sortedPackages = sortPackages(packages, sortCriteria);

  return (
    <div>
      <div className="banner-container">
        <img className="destination-image-full" src={`http://localhost:3000/${destination.image}`} alt={destination.destinationName} />
        <div className="destination-name-overlay">
          <h1>{destination.destinationName}</h1>
        </div>
        </div>
        <div className="package-details-container">
      
      </div>
      <br />

      <div className="good-to-know">
        <h2>Good to Know</h2>
        <p>{destination.description}</p>
        <div className="weather-climate">
          <h2>Weather & Climate</h2>
          <img className="climate-image" src={`http://localhost:3000/${destination.climate}`} alt="Climate" />
        </div>
      </div>
      <br />
      <div className="destination-details">
        <h2>Trending</h2>
        <h3>Inspiring Ideas for {destination.destinationName} vacations</h3>
      </div>

      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="days">Number of Days</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="package-container">
        {sortedPackages.map((pkg) => (
          <article
            key={pkg._id}
            className="tour-item col-xs-12 col-sm-6 col-lg-4"
            onClick={() => handlePackageClick(pkg)} // Add click handler
          >
            <div className="tour-item-wrapper">
              <img src={`http://localhost:3000/${pkg.packageImage}`} alt={pkg.packageName} className="destination-image" />
              <div className="entry-body">
                <h3 className="entry-title">
                  <a href={`/packages/${pkg._id}`} itemProp="url">{pkg.packageName}</a>
                </h3>
                <div className="tour-destinations">
                  <i className="fas fa-map-marker-alt">&nbsp;&nbsp;&nbsp;</i>
                  {Array.isArray(pkg.locations) ? pkg.locations.join(' - ') : pkg.locations}
                </div>
                <p className="entry-price">No of day : {pkg.noOfDays} &nbsp;&nbsp;&nbsp;&nbsp;Price : {pkg.amountPerPerson}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      
    </div>
  );
}

export default DestinationDetails;
