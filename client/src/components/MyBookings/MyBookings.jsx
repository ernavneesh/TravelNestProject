import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import './MyBookings.css';

const MyBookings = () => {
  const { userInfo } = useContext(SessionContext);
  const [bookingsWithDetails, setBookingsWithDetails] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (userInfo) {
          const userId = userInfo.userId;
          const token = userInfo.token;
          const bookingResponse = await fetch(`http://localhost:3000/api/bookPackage/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });

          if (!bookingResponse.ok) {
            throw new Error(`HTTP error! Status: ${bookingResponse.status}`);
          }

          const bookingData = await bookingResponse.json();

          const bookingsWithDetails = await Promise.all(
            bookingData.map(async booking => {
              const packageDetails = booking.packageId;

              let discountDetails = null;
              if (booking.discountId) {
                const discountResponse = await fetch(`http://localhost:3000/api/discount/${booking.discountId._id}`, {
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`,
                  }
                });
                if (discountResponse.ok) {
                  discountDetails = await discountResponse.json();
                } else {
                  console.error(`Failed to fetch discount details for discountId: ${booking.discountId._id}`);
                }
              }

              let reviewExists = false;
              const reviewResponse = await fetch(`http://localhost:3000/api/reviews/${booking._id}`, {
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `${token}`,
                }
              });

              if (reviewResponse.status !== 404 && reviewResponse.ok) {
                const reviewData = await reviewResponse.json();
                if (Object.keys(reviewData).length > 0) {
                  reviewExists = true;
                }
              }

              return {
                ...booking,
                packageName: packageDetails.packageName,
                amountPerPerson: packageDetails.amountPerPerson,
                itinerary: packageDetails.itinerary,
                discountDetails,
                reviewExists,
              };
            })
          );

          setBookingsWithDetails(bookingsWithDetails);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userInfo]);

  const toggleBookingDetails = (bookingId) => {
    setSelectedBookingId(selectedBookingId === bookingId ? null : bookingId);
  };

  const openReviewPopup = (event, booking) => {
    event.stopPropagation();
    setSelectedBookingId(booking._id);
    setIsReviewPopupOpen(true);
    setValidationError('');
  };

  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
    setReviewRating(0);
    setReviewComment('');
    setValidationError('');
  };

  const handleStarHover = (rating) => {
    setReviewRating(rating);
  };

  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };

  const handleReviewSubmit = async () => {
    try {
      if (reviewRating === 0 || reviewComment.trim() === '') {
        setValidationError('Both rating and comment are mandatory.');
        return;
      }

      const selectedBooking = bookingsWithDetails.find(booking => booking._id === selectedBookingId);

      const reviewData = {
        packageId: selectedBooking.packageId,
        bookingId: selectedBooking._id,
        userId: userInfo.userId,
        rating: reviewRating,
        reviewDescription: reviewComment,
      };

      const token = userInfo.token;

      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Review submitted:', reviewRating, reviewComment);
      closeReviewPopup();

      setBookingsWithDetails(prevBookings => 
        prevBookings.map(booking =>
          booking._id === selectedBookingId ? { ...booking, reviewExists: true } : booking
        )
      );

    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!userInfo) {
    return <p>Please log in to view your bookings.</p>;
  }

  const selectedBooking = bookingsWithDetails.find(booking => booking._id === selectedBookingId);

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookingsWithDetails.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookingsWithDetails.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-summary" onClick={() => toggleBookingDetails(booking._id)}>
              <div className="booking-row">
                <p><strong>Booking ID:</strong> {booking._id}</p>
                <p><strong>Date of Travel:</strong> {new Date(booking.dateOfTravel).toLocaleDateString()}</p>
                <p><strong>Promo Code:</strong> {booking.discountDetails ? booking.discountDetails.promoCode : 'Not Available'}</p>
                <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
              </div>
              {selectedBookingId === booking._id && (
                <div className="booking-details">
                  <div className="booking-row">
                    <p><strong>Package Name:</strong> {booking.packageName}</p>
                    <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>No of Persons:</strong> {booking.noOfPerson}</p>
                    <p><strong>Amount per Person:</strong> ${booking.amountPerPerson}</p>
                  </div>
                  <div className="person-details">
                    {booking.personDetails.map((person, index) => (
                      <div key={person._id} className="person-card">
                        <p><strong>Person {index + 1}:</strong> {person.firstname} {person.lastname}, {person.email}</p>
                      </div>
                    ))}
                  </div>
                  {!booking.reviewExists && (
                    <button onClick={(e) => openReviewPopup(e, booking)} className="review-button">Write a review</button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {isReviewPopupOpen && selectedBooking && (
        <div className="review-popup">
          <div className="review-popup-content">
            <h3>{selectedBooking.packageName}</h3>
            <p>{userInfo.firstName} {userInfo.lastName}</p>
            <p>Posting publicly across TravelNest</p>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= reviewRating ? 'filled' : ''}
                  onMouseEnter={() => handleStarHover(star)}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share details of your own experience at this place"
              className="review-textarea"
            />
            {validationError && <p className="error-message">{validationError}</p>}
            <div className="review-popup-buttons">
              <button onClick={handleReviewSubmit} className="post-button">Post</button>
              <button onClick={closeReviewPopup} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
