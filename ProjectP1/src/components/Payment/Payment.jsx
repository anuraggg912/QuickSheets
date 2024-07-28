import React, { useState, useEffect } from 'react';
import './Payment.css';
import axios from 'axios';

const PaymentOptions = () => {
    const [orderSummary, setOrderSummary] = useState({
        price: 0,
        totalAmount: 0,
        email: '',
        contact: ''
    });
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchOrderSummary = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order-summary');
                setOrderSummary(response.data);
                console.log('Order Summary:', response.data); // Log order summary data
            } catch (error) {
                console.error('Error fetching order summary', error);
            }
        };

        fetchOrderSummary();
    }, []);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!orderSummary.totalAmount || orderSummary.totalAmount <= 0) {
            alert('Invalid amount');
            return;
        }

        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            // Create an order on your server
            const order = await axios.post('http://localhost:5000/create-order', {
                amount: orderSummary.totalAmount * 100, // Amount in paisa
            });

            // Options for Razorpay
            const options = {
                key: 'rzp_live_lxisZa3qtRuaxX', // Replace with your Razorpay key ID
                amount: order.data.amount,
                currency: 'INR',
                name: 'QuickSheets',
                description: 'Payment for Order',
                order_id: order.data.id,
                handler: async (response) => {
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id;
                    const signature = response.razorpay_signature;

                    // Verify payment on your server
                    const paymentVerification = await axios.post('http://localhost:5000/verify-payment', {
                        paymentId,
                        orderId,
                        signature,
                    });

                    if (paymentVerification.data.success) {
                        setPaymentStatus('Payment successful!');
                    } else {
                        setPaymentStatus('Payment verification failed.');
                    }
                },
                prefill: {
                    email: orderSummary.email,
                    contact: orderSummary.contact,
                },
                notes: {
                    address: 'Corporate Office',
                },
                theme: {
                    color: '#5271ff',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error in payment processing', error);
        }
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
                    <button type="submit">Pay ₹{orderSummary.totalAmount}</button>
                </form>
                {paymentStatus && <p>{paymentStatus}</p>}
            </div>
        </div>
    );
};

export default PaymentOptions;
