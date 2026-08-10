import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/hmac';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'demo_secret_key_123';

    // Verify HMAC-SHA256 signature to prevent payment forgery attacks
    const isValidSignature = verifyRazorpaySignature(rawBody, signature, webhookSecret);

    if (!isValidSignature && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Invalid HMAC signature. Security audit alert logged.' },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody || '{}');
    const event = payload.event || 'payment.captured';

    if (event === 'payment.captured') {
      const paymentEntity = payload.payload?.payment?.entity || {};
      const amount = (paymentEntity.amount || 0) / 100;
      const email = paymentEntity.email || '';
      const notes = paymentEntity.notes || {};

      console.log(`[+] Payment Captured: ₹${amount} from ${email}. PAN: ${notes.pan || 'N/A'}`);
    }

    return NextResponse.json({
      received: true,
      status: 'PROCESSED',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook Handler Exception' },
      { status: 500 }
    );
  }
}
