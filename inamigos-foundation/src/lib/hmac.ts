import crypto from 'crypto';

/**
 * Verifies Razorpay Webhook Signature using HMAC-SHA256
 */
export function verifyRazorpaySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(signature, 'utf-8')
  );
}

/**
 * Verifies Stripe Webhook Signature
 */
export function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  endpointSecret: string
): boolean {
  if (!sigHeader || !endpointSecret) return false;

  const parts = sigHeader.split(',');
  let timestamp = '';
  let signature = '';

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key.trim() === 't') timestamp = value;
    if (key.trim() === 'v1') signature = value;
  }

  if (!timestamp || !signature) return false;

  const payload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', endpointSecret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(signature, 'utf-8')
  );
}
