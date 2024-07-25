import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SessionContext } from '../../context/SessionContext'; 
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext); 
  const { clientSecret, bookingData } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

  const sendEmails = async () => {
    const emailPromises = bookingData.personDetails.map((passenger) => {
      const endDate = new Date(bookingData.dateOfTravel);
      endDate.setDate(endDate.getDate() + bookingData.noOfDays);

      return fetch('http://localhost:3000/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: passenger.email,
          subject: 'Booking Confirmation',
          text: `
          🚀 Your Adventure Awaits! 🚀

          Hi ${passenger.firstname} ${passenger.lastname},

          Thank you for choosing **Travel Nest** for your upcoming adventure! 🌍✨

          We've attached your receipt, including any extras purchased for your booking. Below is everything you need to know about your trip:

          ========================================
          🎟️ **E-ticket Info**
          🗓️ **Check-in Details**
          📋 **Full Trip Details**
          ========================================

          Enjoy your journey! 🌟✈️

          ----------------------------------------
          **Booking Status: CONFIRMED**
          ----------------------------------------

          **Trip Summary** 📍
          Destination: ${bookingData.tripLocation}
          Dates: ${new Date(bookingData.dateOfTravel).toDateString()} - ${endDate.toDateString()}

          **Passenger(s):**
          1. ${passenger.firstname} ${passenger.lastname}

          **Total Amount** 💰
          CAD: ${bookingData.totalAmount.toFixed(2)}

          ----------------------------------------
          **Important Notes:**
          - Check the "Above Booking Information" for details of your trip.
          - For available services, contact our support to confirm availability and cost.
          - Find more information via travelnestbyechologic@gmail.com.

          ----------------------------------------

          Best regards,
          **The Travel Nest Team** ✨
          `
        })
      });
    });

    await Promise.all(emailPromises);
    setEmailStatus('Emails sent successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${bookingData.personDetails[0].firstname} ${bookingData.personDetails[0].lastname}`,
        },
      },
    });

    if (error) {
      setPaymentStatus('error');
      console.error(error);
    } else {
      setPaymentStatus('success');
      console.log('Payment successful:', paymentIntent);

      // Send booking data to booking API
      const bookingPayload = {
        packageId: bookingData.packageId,
        userId: userInfo.userId,
        noOfPerson: bookingData.personDetails.length,
        personDetails: bookingData.personDetails.map((data) => ({
          firstname: data.firstname,
          lastname: data.lastname,
          dateOfBirth: new Date(data.dateOfBirth),
          passportNumber: data.passportNumber,
          passportExpiry: new Date(data.passportExpiry),
          contact: data.contact,
          email: data.email,
        })),
        amountPerPerson: bookingData.amountPerPerson,
        dateOfTravel: new Date(bookingData.dateOfTravel),
        bookingDate: new Date(),
        totalAmount: bookingData.totalAmount
      };

      try {
        const token = userInfo.token;
        const response = await fetch('http://localhost:3000/api/bookPackage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
          body: JSON.stringify(bookingPayload)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Booking successful:', responseData);

        await sendEmails();

        setTimeout(() => {
          navigate('/');
        }, 4000);
      } catch (error) {
        console.error('Booking failed:', error);
        setPaymentStatus('error');
      }
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement className="card-element" />
        <button type="submit" className="pay-button" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentStatus === 'success' && (
        <div>
          <p className="payment-message success">Payment successful!</p>
          <p className="email-message">{emailStatus}</p>
          <p className="redirect-message">Redirecting to home page...</p>
        </div>
      )}
      {paymentStatus === 'error' && <p className="payment-message error">Payment failed. Please try again.</p>}
    </div>
  );
}

export default Payment;
