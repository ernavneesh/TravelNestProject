import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext'; 
import './BookingDetails.css';

//const stripePromise = loadStripe('pk_test_51PcxHYHdWUZnn01otPVySYcfLnYPt92VUNiVieydSW4buIZgvuA6cICM62wXgYHNqZ8veYcTUq2Rqi9A7maxL7So00sG2rnyd9');


function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext); 

  const {
    packageId,
    persons,
    dateOfTravel,
    packageName,
    amountPerPerson,
    discountId,
    discountPercentage,
    promoCode,
    location: tripLocation,
    noOfDays
  } = location.state;

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
  }, [passengers.length, discountId, discountPercentage, amountPerPerson]);
  
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
    if (!formData.passportExpiry || new Date(formData.passportExpiry) <= new Date(dateOfTravel)) {
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
    if (passengers.length === parseInt(persons)) {
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
        console.error('Booking failed:', error);
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleEdit = (index) => {
    const passengerToEdit = passengers[index];
    setFormData(passengerToEdit);
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  return (
    <div>
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
            {passengers.length < parseInt(persons) && (
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
            {promoCode && <p>Applied Promo Code: {promoCode}</p>}
            <p>Estimated Tax: ${(estimatedTax).toFixed(2)}</p>
            <p>Order Total: ${subTotal.toFixed(2)}</p>
          </div>
          {passengers.length === parseInt(persons) && (
            <button className="payment-btn" onClick={handleBooking} disabled={processing}>
              {processing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
