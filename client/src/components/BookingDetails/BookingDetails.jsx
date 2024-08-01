import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';
import './BookingDetails.css';

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext);

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
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { amountPerPerson, discountId, discountPercentage } = location.state;
      const totalFare = amountPerPerson * passengers.length;
      let discountPercentageToUse = discountPercentage;
      if (!discountId) {
        discountPercentageToUse = 0;
      }
      const discountAmount = totalFare * (discountPercentageToUse / 100);
      const discountedTotal = totalFare - discountAmount;
      const taxAmount = discountedTotal * 0.13;
      console.log("Amount :", totalFare, amountPerPerson, passengers.length, discountId);
      setTotalCost(totalFare);
      setDiscountedCost(discountedTotal);
      setEstimatedTax(taxAmount);
      setSubTotal(discountedTotal + taxAmount);
    }
  }, [passengers.length, location.state]);

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
    if (!formData.passportExpiry || new Date(formData.passportExpiry) <= new Date(location.state?.dateOfTravel)) {
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
    if (passengers.length === parseInt(location.state?.persons)) {
      const { packageId, dateOfTravel, tripLocation, noOfDays, amountPerPerson, persons, discountId } = location.state;
      const bookingData = {
        packageId: packageId,
        userId: userInfo.userId,
        discountId: discountId || null,
        noOfPerson: persons,
        personDetails: passengers.map((data) => ({
          firstname: data.firstName,
          lastname: data.lastName,
          dateOfBirth: new Date(data.dateOfBirth),
          passportNumber: data.passportNumber,
          passportExpiry: new Date(data.passportExpiry),
          contact: data.contactNumber,
          email: data.email,
        })),
        amountPerPerson: amountPerPerson,
        dateOfTravel: new Date(dateOfTravel),
        bookingDate: new Date(),
        totalAmount: subTotal,
        tripLocation: tripLocation,
        noOfDays: noOfDays
      };

      try {
        const response = await fetch('http://localhost:3000/api/createPaymentIntent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount: subTotal })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { clientSecret } = await response.json();
        console.log('Payment Intent created:', clientSecret);

        navigate('/payment', { state: { clientSecret, bookingData } });
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    }
  };

  const handleEdit = (index) => {
    const passenger = passengers[index];
    setFormData({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      dateOfBirth: new Date(passenger.dateOfBirth).toISOString().substring(0, 10),
      passportNumber: passenger.passportNumber,
      passportExpiry: new Date(passenger.passportExpiry).toISOString().substring(0, 10),
      contactNumber: passenger.contactNumber,
      email: passenger.email,
      errors: {}
    });
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  if (!location.state) {
    return (
      <div className="error-message">
        Error: No booking information found. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="container">
      <div className="passenger-form">
        <h2>Passenger Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-container">
              <label className="input-label">First Name *</label>
              <input
                type="text"
                className="input-style"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="First Name *"
                required
              />
              {formData.errors.firstName && <span className="error">{formData.errors.firstName}</span>}
            </div>
            <div className="input-container">
              <label className="input-label">Last Name *</label>
              <input
                type="text"
                className="input-style"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Last Name *"
                required
              />
              {formData.errors.lastName && <span className="error">{formData.errors.lastName}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="input-label">Date of Birth *</label>
              <input
                type="date"
                className="input-style"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                placeholder="Date of Birth *"
                required
              />
              {formData.errors.dateOfBirth && <span className="error">{formData.errors.dateOfBirth}</span>}
            </div>
            <div className="input-container">
              <label className="input-label">Passport Number *</label>
              <input
                type="text"
                className="input-style"
                value={formData.passportNumber}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
                placeholder="Passport Number *"
                required
              />
              {formData.errors.passportNumber && <span className="error">{formData.errors.passportNumber}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="input-label">Passport Expiry Date *</label>
              <input
                type="date"
                className="input-style"
                value={formData.passportExpiry}
                onChange={(e) => handleChange('passportExpiry', e.target.value)}
                placeholder="Passport Expiry Date *"
                required
              />
              {formData.errors.passportExpiry && <span className="error">{formData.errors.passportExpiry}</span>}
            </div>
            <div className="input-container">
              <label className="input-label">Contact Number *</label>
              <input
                type="text"
                className="input-style"
                value={formData.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
                placeholder="Contact Number *"
                required
              />
              {formData.errors.contactNumber && <span className="error">{formData.errors.contactNumber}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="input-label">Email *</label>
              <input
                type="email"
                className="input-style"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Email *"
                required
              />
              {formData.errors.email && <span className="error">{formData.errors.email}</span>}
            </div>
          </div>
          {passengers.length < parseInt(location.state.persons) && (
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
          {location.state.promoCode && <p>Applied Promo Code: {location.state.promoCode}</p>}
          <p>Estimated Tax: ${(estimatedTax).toFixed(2)}</p>
          <p>Order Total: ${subTotal.toFixed(2)}</p>
        </div>
        {passengers.length === parseInt(location.state.persons) && (
          <button className="payment-btn" onClick={handleBooking} disabled={processing}>
            {processing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingDetails;
