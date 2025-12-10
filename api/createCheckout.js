export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For now, redirect to a fixed Stripe payment link
    // You need to create this in Stripe dashboard
    const paymentLink = 'https://checkout.stripe.com/pay/cs_live_YOUR_CHECKOUT_SESSION_ID';
    
    return res.status(200).json({ sessionId: paymentLink });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
