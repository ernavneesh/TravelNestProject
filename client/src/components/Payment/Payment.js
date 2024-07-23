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
      
      console.log("Email :",passenger);
      
      console.log("Email :",passenger.email);
      return fetch('http://localhost:3000/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: passenger.email,
          subject: 'Booking Confirmation',
          text: `
            Your booking is confirmed!
            Hi ${passenger.firstname} ${passenger.lastname},
            Thank you for booking with Travel Nest!
            Please find your receipt, including any extras purchased for your booking, attached to this email.
            Below is everything related to your upcoming trip, including:

            E-ticket info, check-in details, full trip details.
            Download your receipt/s and create a business receipt
            Make sure to stay updated - your trip details may change at any time.
            Have a great trip!

            Booking Status  Confirmed

            Your Trip Summary
            ${bookingData.location}
            ${new Date(bookingData.dateOfTravel).toDateString()} - ${endDate.toDateString()}
            ${bookingData.personDetails.length} passenger(s):
            ${bookingData.personDetails.map(p => `${p.firstname} ${p.lastname}`).join('\n')}

            Total 
            CAD : ${bookingData.totalAmount.toFixed(2)}

            Things to keep in mind:
            • Check "Above Booking Information" for details of your trip. If listed among the available services there, contact our support to confirm availability and cost for your trip, or find more information here.
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
        }, 20000);
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
