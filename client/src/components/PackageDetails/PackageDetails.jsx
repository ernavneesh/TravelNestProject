import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [persons, setPersons] = useState(1);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/package/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };

    fetchPackageData();
  }, [id]);

  if (!packageData) {
    return <div>Loading...</div>;
  }

  const { packageName, noOfDays, amountPerPerson, overviewDetails, highlights = [], itinerary = [], packageImage, locations } = packageData;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handlePersonsChange = (event) => {
    setPersons(event.target.value);
  };

  return (
    <div>
      <div className="banner-container">
        <img className="destination-image-full" src={`http://localhost:3000/${packageImage}`} alt={packageName} />
      </div>
      <div className="navbar">
        <ul className="links">
          <li><a href="#overview">OVERVIEW</a></li>
          <li><a href="#trip-highlights">TRIP HIGHLIGHTS</a></li>
          <li><a href="#itinerary">ITINERARY</a></li>
          <li><a href="#information">INFORMATION</a></li>
          <li><a href="#reviews">REVIEWS</a></li>
          <li><a href="#book-package">BOOK PACKAGE</a></li>
        </ul>
      </div>

      <div className="package-details-container">
        <div className="package-info">
          <h2 className="package-name">{packageName}</h2>
          <div className="details">
            <span className="duration">Duration: {noOfDays} days</span>
            <span className="amount-per-person">Amount per person: ${amountPerPerson}</span>
            <a href="#share" className="share-link">Share</a>
          </div>
        </div>

        <div className="content-section">
          <section id="overview">
            <h2>Overview</h2>
            <div className="location-list">
              <i className="fas fa-map-marker-alt"></i>
              {locations.split(' – ').map((location, index) => (
                <span key={index}>{location}</span>
              ))}
            </div>
            <h4>{overviewDetails}</h4>
          </section>

          <section id="trip-highlights">
            <h2>Trip Highlights</h2>
            <ul>
              {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section id="itinerary">
            <h2>Use this itinerary to inspire your bespoke journey</h2>
            {itinerary.map((item, index) => (
              <div key={index} className="itinerary-item">
                <div className={`accordion ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                  {item.shortDescription}
                </div>
                <div className={`panel ${activeIndex === index ? 'open' : ''}`}>
                  {item.image && (
                    <img src={`http://localhost:3000/${item.image}`} alt={item.shortDescription} />
                  )}
                  <p>{item.longDescription}</p>
                  <p>Meals: {item.meal}</p>
                </div>
              </div>
            ))}
          </section>

          <section id="information">
            <h2>Useful Information</h2>
            <p>This sample itinerary was created by our travel experts as inspiration for your next trip. Ready for your customization. You pick to suit your budget, desires, and cultural experiences. The price of this trip will vary, depending on the number of people in your party, dates of departure, and the availability of ground services. Please click on Inquire Now (above) and give us the necessary information to enable us to send you a FREE personalized quote within 24 hours if not sooner!</p>
            <div className="info-section">
              <div className="info-include">
                <h3>Our Service Include:</h3>
                <ul>
                  <li>Accommodation in a shared twin or shared double room.</li>
                  <li>Meals as mentioned.</li>
                  <li>English or French speaking guide (for other languages and a national guide supplements apply).</li>
                  <li>Tours and transfers as mentioned by private air-conditioned vehicle.</li>
                  <li>Entrance fees for mentioned visits.</li>
                  <li>Boat trip as mentioned in the itinerary.</li>
                  <li>All flights within Vietnam and Cambodia.</li>
                  <li>Drinking water while touring.</li>
                  <li>Tax & service charge.</li>
                </ul>
              </div>
              <div className="info-exclude">
                <h3>Our Service Exclude:</h3>
                <ul>
                  <li>Visa to Vietnam & Cambodia.</li>
                  <li>Other non-mentioned meals.</li>
                  <li>Other non-mentioned services.</li>
                  <li>International Flights to/from Hanoi.</li>
                  <li>Laundry, telephone calls, and personal expenditures.</li>
                  <li>Tips, travel insurance.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="reviews">
            <div className="review-details">
              <img src="http://localhost:3000/path/to/tripadvisor-logo.png" alt="Tripadvisor" className="tripadvisor-logo" />
              <div className="review-rating">
                <span className="rating-value">4.9</span>
                <span className="review-count">1498 reviews</span>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <a href="#view-all-reviews" className="view-all-reviews">VIEW ALL REVIEWS</a>
              </div>
            </div>
            <div className="booking-section">
              <label htmlFor="persons">Select number of persons:</label>
              <select id="persons" value={persons} onChange={handlePersonsChange}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button className="book-now-btn">Book Now</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
