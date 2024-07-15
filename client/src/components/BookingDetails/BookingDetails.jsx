import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingDetails.css';

const travelDate = new Date('2024-08-29'); 
const pricePerPerson = 200;
const estimatedTaxRate = 0.13; 
const numberOfPassengers = 1;
const packageId = "667c9d4ee1aa4d74daaeb59c";
const userId = "6678d00b5ac2628ef8ac4f0c";
const discountId = "66820d3bbcd284971a8efd39";
const discountPercentage = 10; 
const promoCode = "VIE2155";
const location = "Danang - Hoi An – My Son Sanctuary - Hue – Bach Ma National Park";
const noOfDays = 5;

function BookingDetails() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    passportNumber: '',
    passportExpiry: '',
    contactNumber: '',
    email: '',
    errors: {}
  });

  const [passengers, setPassengers] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [discountedCost, setDiscountedCost] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const totalFare = pricePerPerson * passengers.length;
    const discountAmount = totalFare * (discountPercentage / 100);
    const discountedTotal = totalFare - discountAmount;
    const taxAmount = discountedTotal * estimatedTaxRate;
    setTotalCost(totalFare);
    setDiscountedCost(discountedTotal);
    setEstimatedTax(taxAmount);
    setSubTotal(discountedTotal + taxAmount);
  }, [passengers.length]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
      errors: { ...formData.errors, [field]: '' }
    });
  };

  const validate = () => {
    let isValid = true;
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.dateOfBirth || new Date(formData.dateOfBirth) >= new Date()) {
      errors.dateOfBirth = 'Date of birth must be less than today';
      isValid = false;
    }
    if (!formData.passportNumber) {
      errors.passportNumber = 'Passport number is required';
      isValid = false;
    }
    if (!formData.passportExpiry || new Date(formData.passportExpiry) <= travelDate) {
      errors.passportExpiry = 'Passport expiry date must be after the travel date';
      isValid = false;
    }
    if (!formData.contactNumber || formData.contactNumber.length !== 10) {
      errors.contactNumber = 'Contact number must be 10 digits long';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    setFormData({ ...formData, errors });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setPassengers([...passengers, { ...formData }]);
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        passportNumber: '',
        passportExpiry: '',
        contactNumber: '',
        email: '',
        errors: {}
      });
    }
  };

  const handleBooking = async () => {
    if (passengers.length === numberOfPassengers) {
      const bookingData = {
        packageId: packageId,
        userId: userId,
        discountId: discountId,
        noOfPerson: numberOfPassengers,
        personDetails: passengers.map((data) => ({
          firstname: data.firstName,
          lastname: data.lastName,
          dateOfBirth: new Date(data.dateOfBirth),
          passportNumber: data.passportNumber,
          passportExpiry: new Date(data.passportExpiry),
          contact: data.contactNumber,
          email: data.email,
        })),
        amountPerPerson: pricePerPerson,
        dateOfTravel: travelDate,
        bookingDate: new Date(),
        totalAmount: subTotal
      };

      try {
        const response = await fetch('http://localhost:3000/api/bookPackage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Booking successful:', responseData);

        // Send email to all passengers
        const emailPromises = passengers.map((passenger) => {
          const endDate = new Date(travelDate);
          endDate.setDate(endDate.getDate() + noOfDays);

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
                Hi ${passenger.firstName} ${passenger.lastName},
                Thank you for booking with Travel Nest!
                Please find your receipt, including any extras purchased for your booking, attached to this email.
                Below is everything related to your upcoming trip, including:

                E-ticket info, check-in details, full trip details.
                Download your receipt/s and create a business receipt
                Make sure to stay updated - your trip details may change at any time.
                Have a great trip!

                Booking Status  Confirmed
                

                Your Trip Summary
                ${location}
                ${travelDate.toDateString()} - ${endDate.toDateString()}
                ${passengers.length} passenger(s):
                ${passengers.map(p => `${p.firstName} ${p.lastName}`).join('\n')}

                Total 
                CAD : ${subTotal.toFixed(2)}

                Things to keep in mind:
                • Check "Above Booking Information" for details of your trip. If listed among the available services there, contact our support to confirm availability and cost for your trip, or find more information here.
              `
            })
          });
        });

        await Promise.all(emailPromises);
        console.log('Emails sent successfully');

        navigate('/processing');
      } catch (error) {
        console.error('Booking failed:', error);
      }
    }
  };

  const handleEdit = (index) => {
    const passengerToEdit = passengers[index];
    setFormData(passengerToEdit);
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="passenger-form">
        <form onSubmit={handleSubmit}>
          <h2>Enter Person Details</h2>
          <div className="form-row">
            <input
              className="input-style"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="First Name *"
            />
            {formData.errors.firstName && <span className="error">{formData.errors.firstName}</span>}
            <input
              className="input-style"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Last Name *"
              required
            />
            {formData.errors.lastName && <span className="error">{formData.errors.lastName}</span>}
          </div>
          <div className="form-row">
            <div className="input-container">
              <input
                className="input-style"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                required
              />
              <span className="input-label">Date of Birth *</span>
            </div>
            {formData.errors.dateOfBirth && <span className="error">{formData.errors.dateOfBirth}</span>}
            <input
              className="input-style"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email *"
            />
            {formData.errors.email && <span className="error">{formData.errors.email}</span>}
          </div>
          <div className="form-row">
            <input
              className="input-style"
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={(e) => handleChange('passportNumber', e.target.value)}
              placeholder="Passport Number *"
              required
            />
            {formData.errors.passportNumber && <span className="error">{formData.errors.passportNumber}</span>}
            <div className="input-container">
              <input
                className="input-style"
                type="date"
                name="passportExpiry"
                value={formData.passportExpiry}
                onChange={(e) => handleChange('passportExpiry', e.target.value)}
                required
              />
              <span className="input-label">Passport Expiry Date *</span>
            </div>
            {formData.errors.passportExpiry && <span className="error">{formData.errors.passportExpiry}</span>}
          </div>
          <div className="form-row">
            <input
              className="input-style"
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              placeholder="Contact Number *"
              required
            />
            {formData.errors.contactNumber && <span className="error">{formData.errors.contactNumber}</span>}
          </div>
          {passengers.length < numberOfPassengers && (
            <button type="submit" className="btn">
              Add Passenger
            </button>
          )}
        </form>
      </div>
      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <ul>
          {passengers.map((passenger, index) => (
            <li key={index} className="passenger-item">
              <span>{passenger.firstName} {passenger.lastName}</span>
              <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
        <div className="summary-details">
          <p>No of Persons: {passengers.length}</p>
          <p>Subtotal: ${totalCost.toFixed(2)}</p>
          {discountId && <p>Applied Promo Code: {promoCode}</p>}
          <p>Estimated Tax: ${(totalCost * 0.13).toFixed(2)}</p>
          <p>Order Total: ${subTotal.toFixed(2)}</p>
        </div>
        {passengers.length === numberOfPassengers && (
          <button className="payment-btn" onClick={handleBooking}>Proceed to Payment</button>
        )}
      </div>
    </div>
  );
}

export default BookingDetails;
