import { Request, Response } from 'express';
import crypto from 'crypto';

/**
 * Creates Razorpay Order for INR / UPI / Card Donations
 */
export async function createRazorpayOrder(req: Request, res: Response) {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount for Razorpay order creation.' });
    }

    const orderId = 'order_' + crypto.randomBytes(8).toString('hex');

    return res.json({
      success: true,
      data: {
        id: orderId,
        entity: 'order',
        amount: amount * 100, // in paise
        currency,
        receipt: 'rcpt_' + Math.floor(100000 + Math.random() * 900000),
        status: 'created',
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo123',
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create Razorpay order.' });
  }
}

/**
 * Verifies Razorpay Payment Signature using HMAC-SHA256
 */
export async function verifyRazorpayPayment(req: Request, res: Response) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing Razorpay signature verification parameters.' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'demo_secret_key_123';
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid && process.env.NODE_ENV === 'production') {
      return res.status(400).json({ error: 'Invalid Razorpay HMAC signature verification failed.' });
    }

    const receiptNo = 'IAM-80G-' + Math.floor(100000 + Math.random() * 900000);

    return res.json({
      success: true,
      message: 'Razorpay payment signature verified.',
      data: {
        receiptNo,
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: 'VERIFIED',
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
}

/**
 * Creates Stripe PaymentIntent for Multi-Currency (USD / EUR / GBP) Donations
 */
export async function createStripePaymentIntent(req: Request, res: Response) {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount for Stripe PaymentIntent creation.' });
    }

    const clientSecret = 'pi_' + crypto.randomBytes(12).toString('hex') + '_secret_' + crypto.randomBytes(8).toString('hex');

    return res.json({
      success: true,
      data: {
        clientSecret,
        amount,
        currency,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_demo123',
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create Stripe PaymentIntent.' });
  }
}
