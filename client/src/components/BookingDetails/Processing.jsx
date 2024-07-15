import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Processing.css';

function Processing() {
  const [processing, setProcessing] = useState(true);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sendEmail = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setProcessing(false);
      setCompleted(true);
      setTimeout(() => {
        navigate('/');
      }, 5000); 
    };
    sendEmail();
  }, [navigate]);

  return (
    <div className="processing-container">
      {processing && (
        <div className="processing">
          <div className="spinner"></div>
          <p>Processing your booking...</p>
        </div>
      )}
      {completed && (
        <div className="completed">
          <div className="tick-mark">&#10004;</div>
          <p>Booking Completed!</p>
        </div>
      )}
    </div>
  );
}

export default Processing;
