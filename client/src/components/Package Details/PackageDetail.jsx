import React, { useState, useEffect } from 'react';
import Header from './Header';  // Assuming Header is in the same directory
import './PackageDetails.css';  // Create a CSS file for styling

const PackageDetails = ({ packageId }) => {
  const [packageData, setPackageData] = useState({
    packageImage: 'https://vilandtravel.com/wp-content/uploads/2023/03/ha-noi-hoa-lo-prison-viland-travel-1.png.webp',
    packageName: 'Vietnam Adventure',
    amountPerPerson: '$1200',
    overviewDetails: 'An amazing journey through Vietnam...',
    locations: ['Hanoi', 'Ha Long Bay', 'Ho Chi Minh City'],
    highlights: ['Explore Hanoi', 'Cruise Ha Long Bay', 'Visit Ho Chi Minh City'],
    itinerary: [
      {
        shortDescription: 'Day 1 : Landing in Hanoi - half day city tour & streetfood tour',
        longDescription: 'Xin chào Việt Nam! Hello Vietnam!\nA warm greeting awaits at Noi Bai International Airport.',
        meal: 'no meal',
        image: 'https://vilandtravel.com/wp-content/uploads/2023/03/ha-noi-hoa-lo-prison-viland-travel-1.png.webp',
      },
      // Add more days as needed
    ],
  });
  const [selectedDay, setSelectedDay] = useState(null);

  // useEffect(() => {
  //   const fetchPackageData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/package/${packageId}`);
  //       const data = await response.json();
  //       setPackageData(data);
  //     } catch (error) {
  //       console.error('Error fetching package data:', error);
  //     }
  //   };

  //   fetchPackageData();
  // }, [packageId]);

  const handleDayClick = (dayIndex) => {
    setSelectedDay(selectedDay === dayIndex ? null : dayIndex);
  };

  return (
    <div>
      <Header />
      <div className="package-details">
        <img src={packageData.packageImage} alt={packageData.packageName} className="package-image" />
        
        <div className="links">
          <a href="#overview">Overview</a>
          <a href="#highlights">Trip Highlights</a>
          <a href="#itinerary">Itinerary</a>
          <a href="#useful-info">Useful Information</a>
          <a href="#reviews">Reviews</a>
          <a href="#book-package">Book Package</a>
        </div>
        
        <h1>{packageData.packageName}</h1>
        <p className="amount-per-person">Amount per person: {packageData.amountPerPerson}</p>
        
        <section id="overview">
          <h2>Overview</h2>
          <p>{packageData.overviewDetails}</p>
          <p>Locations: {packageData.locations.join(', ')}</p>
        </section>
        
        <section id="highlights">
          <h2>Trip Highlights</h2>
          <ul>
            {packageData.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>
        
        <section id="itinerary">
          <h2>Use this itinerary to inspire your bespoke journey</h2>
          {packageData.itinerary.map((day, index) => (
            <div key={index} className="itinerary-day">
              <button onClick={() => handleDayClick(index)}>Day {index + 1}: {day.shortDescription}</button>
              {selectedDay === index && (
                <div className="itinerary-details">
                  <p>{day.longDescription}</p>
                  <p>Meal: {day.meal}</p>
                  <img src={day.image} alt={`Day ${index + 1}`} />
                </div>
              )}
            </div>
          ))}
        </section>
        
        <section id="useful-info">
          <h2>Useful Information</h2>
          <p>This sample itinerary was created by our travel experts as inspiration for your next trip. Ready for your customization. You pick to suit your budget, desires, and cultural experiences. The price of this trip will vary, depending on the number of people in your party, dates of departure, and the availability of ground services. Please click on Inquire Now (above) and give us the necessary information to enable us to send you a FREE personalized quote within 24 hours if not sooner!</p>
          <h3>Our Service Includes:</h3>
          <ul>
            <li>Accommodation in a shared twin or shared double room.</li>
            <li>Meals as mentioned.</li>
            <li>English or French speaking guide (for other languages and a national guide supplements apply).</li>
            <li>Tours and transfers as mentioned by private air-conditioned vehicle.</li>
            <li>Entrance fees for mentioned visits.</li>
            <li>Boat trip as mentioned in the itinerary.</li>
            <li>All flights within Vietnam and Cambodia.</li>
            <li>Drinking water while touring</li>
            <li>Tax & service charge</li>
          </ul>
          <h3>Our Service Excludes:</h3>
          <ul>
            <li>Visa to Vietnam & Cambodia.</li>
            <li>Other non-mentioned meals</li>
            <li>Other non-mentioned services</li>
            <li>International Flights to/from Hanoi</li>
            <li>Laundry, telephone calls, and personal expenditures</li>
            <li>Tips, Travel insurance</li>
          </ul>
        </section>
        
        <section id="reviews">
          <h2>Reviews</h2>
          {/* Add your reviews component or details here */}
        </section>
        
        <div className="book-now">
          <h3>Book Now</h3>
          <select>
            {[1, 2, 3, 4, 5].map(number => (
              <option key={number} value={number}>{number} Person{number > 1 ? 's' : ''}</option>
            ))}
          </select>
          <button>Book Package</button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
