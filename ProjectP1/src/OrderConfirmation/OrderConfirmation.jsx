import React from 'react';
import './OrderConfirmation.css';
import greentick from "../../assets/greentick.png"
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {

  return (
    <div className="orderconfirmation">
      <div className="confirmation-icon">
        <img src={greentick} alt="order confirmation" />
      </div>

      <h2>Payment confirmed</h2>
      <p>Thank You for choosing our service!</p>
      <p>For any inconvenience feel free to contact us at quicksheets@gmail.com</p>

      <div className="return-btn">
        <Link to="/">
          <button className="home-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
