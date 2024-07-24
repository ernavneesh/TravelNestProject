const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PcxHYHdWUZnn01olhmEGfAd5DmgKau1CYMfL11prvSzeSeGjI9nHGVt0ecn7926XqR60x8oKKfKaeJDNnYgSolV00xkds5916');

exports.makePayment = async (req, res) => {
  console.log(stripe);
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
  };