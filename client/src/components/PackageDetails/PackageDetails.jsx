import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import './PackageDetails.css';
import tripadvisor from '../../assets/images/tripadvisor-logo.png';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [persons, setPersons] = useState('');
  const [dateOfTravel, setDateOfTravel] = useState('');
  const [error, setError] = useState('');
  const [discountDetails, setDiscountDetails] = useState(null);
  const { userInfo } = useContext(SessionContext);
  const [reviews, setReviews] = useState([]);
  const [fullStars, setFullStars] = useState(0);
  const [halfStar, setHalfStars] = useState(false);
  

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

  useEffect(() => {
    const fetchDiscountDetails = async () => {
      if (userInfo) {
        const userId = userInfo.userId;
        const token = userInfo.token;
        try {
          const response = await fetch(`http://localhost:3000/api/discount/active-discounts/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `${token}`,
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const discounts = await response.json();
          const relevantDiscount = discounts.find(discount => discount.destinationId === packageData.destinationId);
          setDiscountDetails(relevantDiscount);
          console.log("relevantDiscount :", relevantDiscount);
        } catch (error) {
          console.error('Error fetching discount details:', error);
        }
      }
    };

    if (packageData) {
      fetchDiscountDetails();
    }
  }, [userInfo, packageData]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = userInfo.token;
        console.log("ID :",id);
        const response = await fetch(`http://localhost:3000/api/reviews/packageid/${id}`,{
          headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`,
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Review" , data);
        console.log("Average :", data.averageRating);

        const fullStars = Math.floor(data.averageRating);
        const halfStar = data.averageRating % 1 !== 0;
        setFullStars(fullStars);
        setHalfStars(halfStar);
        console.log("Full and half :",fullStars,halfStar);
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [userInfo,id]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handlePersonsChange = (event) => {
    setPersons(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateOfTravel(event.target.value);
  };

  const handleBookNow = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!persons || !dateOfTravel) {
      setError('Please select number of persons and date of travel.');
    } else if (dateOfTravel <= today) {
      setError('Date of travel must be later than today.');
    } else {
      setError('');
      navigate('/bookinginfo', {
        state: {
          packageId: id,
          persons,
          dateOfTravel,
          packageName: packageData.packageName,
          amountPerPerson: packageData.amountPerPerson,
          ...(discountDetails && {
            discountId: discountDetails._id,
            discountPercentage: discountDetails.discountPercentage,
            promoCode: discountDetails.promoCode,
          }),
          location: packageData.locations,
          noOfDays: packageData.noOfDays
        }
      });
      console.log("Booking Details Sent:", {
        packageId: id,
        persons,
        dateOfTravel,
        packageName: packageData.packageName,
        amountPerPerson: packageData.amountPerPerson,
        ...(discountDetails && {
          discountId: discountDetails.discountId,
          discountPercentage: discountDetails.percentage,
          promoCode: discountDetails.promoCode,
        }),
        location: packageData.locations,
        noOfDays: packageData.noOfDays
      });
    }
  };

  if (!packageData) {
    return <div>Loading...</div>;
  }

  const { packageName, noOfDays, amountPerPerson, overviewDetails, highlights = [], itinerary = [], packageImage, locations } = packageData;

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
            <img src={tripadvisor} alt="Tripadvisor" className="tripadvisor-logo" />
            <div className="review-rating">
              <span className="review-count">{reviews && reviews.length > 0 ? `${reviews.length} reviews` : ' 0 reviews' }</span>
              
              <div className="stars">
                {[...Array(fullStars)].map((_, index) => (
                  <i key={index} className="fas fa-star filled-star"></i>
                ))}
                {halfStar && <i className="fas fa-star-half-alt half-star"></i>}                
                {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
                  <i key={index} className="fas fa-star" style={{ color: '#d3d3d3' }}></i>
                ))}
              </div>

            </div>
          </div>
        </section>


          <section id="book-package">
            {userInfo ? (
              <div className="booking-section">
                <h3>Book your dream vacation with us!</h3>
                <label htmlFor="persons">Select number of persons:</label>
                <select id="persons" value={persons} onChange={handlePersonsChange} className="persons-input">
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <label htmlFor="dateOfTravel">Select date of travel:</label>
                <input
                  type="date"
                  id="dateOfTravel"
                  value={dateOfTravel}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="date-input"
                />
                <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
                {error && <p className="error">{error}</p>}
              </div>
            ) : (
              <div className="login-prompt">
                <a href="/login" className="login-link">Please login to book the package.</a>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
