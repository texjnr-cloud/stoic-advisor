import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const body = req.body;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle payment success
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);

      // Get user email from payment intent metadata
      const userEmail = paymentIntent.metadata?.email;
      const userId = paymentIntent.metadata?.user_id;

      if (!userId) {
        console.error('No user_id in payment metadata');
        return res.status(400).json({ error: 'No user_id in metadata' });
      }

      // Update user as paid in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          is_paid: true,
          stripe_customer_id: paymentIntent.customer,
          stripe_payment_id: paymentIntent.id,
          paid_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Failed to update user' });
      }

      console.log('User marked as paid:', userId);
      return res.status(200).json({ success: true, message: 'User marked as paid' });
    }

    // Handle payment failure
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);
      return res.status(200).json({ success: true, message: 'Payment failure logged' });
    }

    // Log other events for debugging
    console.log('Received event type:', event.type);
    return res.status(200).json({ success: true, message: 'Event received' });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
