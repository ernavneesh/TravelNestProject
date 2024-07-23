const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const app = express();

const stripe = Stripe('sk_test_51PcxHYHdWUZnn01olhmEGfAd5DmgKau1CYMfL11prvSzeSeGjI9nHGVt0ecn7926XqR60x8oKKfKaeJDNnYgSolV00xkds5916');

app.use(cors());
app.use(express.json());

app.post('/api/createPaymentIntent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'cad',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
