const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: 'rzp_live_lxisZa3qtRuaxX',
    key_secret: 'JqDqfRKw9zYHP1yxHZDvuLCs',
});

app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const options = {
            amount,
            currency: 'INR',
            receipt: 'receipt_order_74394',
        };

        console.log('Creating order with amount:', amount);

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

app.post('/verify-payment', (req, res) => {
    const { paymentId, orderId, signature } = req.body;

    const generatedSignature = crypto.createHmac('sha256', 'JqDqfRKw9zYHP1yxHZDvuLCs')
        .update(orderId + "|" + paymentId)
        .digest('hex');

    if (generatedSignature === signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully." });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed." });
    }
});

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
