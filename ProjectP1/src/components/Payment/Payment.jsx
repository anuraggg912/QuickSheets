import React, { useState, useEffect } from 'react';
import './Payment.css';
import axios from 'axios';

const PaymentOptions = () => {
    const [orderSummary, setOrderSummary] = useState({});
    const [upiID, setUpiID] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchOrderSummary = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order-summary');
                setOrderSummary(response.data);
            } catch (error) {
                console.error('Error fetching order summary', error);
            }
        };

        fetchOrderSummary();
    }, []);

    const handleUpiIDChange = (event) => {
        setUpiID(event.target.value);
    };

    const handlePayment = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        if (!upiID) {
            alert('Please enter your UPI ID');
            return;
        }

        const { totalAmount } = orderSummary;

        // Create UPI payment URL
        const paymentUrl = `upi://pay?pa=${upiID}&pn=QuickSheets&mc=1234&tid=1234567890&tt=10&am=${totalAmount}&cu=INR&url=https://quick-sheets.com`;

        // Open UPI app
        window.location.href = paymentUrl;

        setPaymentStatus('Check your UPI app for payment request.');
    };

    return (
        <div className="payment-container">
            <div className="order-summary">
                <h2>Order Summary</h2>
                <p>Price: ₹{orderSummary.price}</p>
                <p>Delivery Fee: ₹0 (FREE)</p>
                <h3>Total Amount: ₹{orderSummary.totalAmount}</h3>
            </div>
            <div className="payment-options">
                <h2>Pay Here</h2>
                <form onSubmit={handlePayment}>
                    <label>
                        Please enter your UPI ID
                    </label>
                    <input
                        type="text"
                        value={upiID}
                        onChange={handleUpiIDChange}
                        placeholder="Enter UPI ID"
                    />
                    <button type="submit">Pay ₹{orderSummary.totalAmount}</button>
                </form>
                {paymentStatus && <p>{paymentStatus}</p>}
            </div>
        </div>
    );
};

export default PaymentOptions;
