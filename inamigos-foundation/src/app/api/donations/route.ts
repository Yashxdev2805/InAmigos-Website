import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  // Rate limiting check (10 requests per minute)
  const limitResult = rateLimit(ip, 10, 60000);
  if (!limitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limitResult.reset) } }
    );
  }

  try {
    const body = await request.json();
    const { amount, donorName, donorEmail, donorPan, paymentMode, causeTitle } = body;

    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: 'Missing required donation fields.' },
        { status: 400 }
      );
    }

    // Validate PAN Format if provided (e.g. ABCDE1234F)
    if (donorPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donorPan.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid PAN Number format. Format must be ABCDE1234F.' },
        { status: 400 }
      );
    }

    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const receiptNo = 'IAM-80G-' + Math.floor(100000 + Math.random() * 900000);
    const taxDeducted = Math.round(amount * 0.5 * 0.3 * 1.04);

    return NextResponse.json({
      success: true,
      message: 'Donation order created and verified.',
      data: {
        receiptNo,
        transactionId,
        amount,
        donorName,
        donorEmail,
        donorPan: donorPan ? donorPan.toUpperCase() : 'N/A',
        paymentMode: paymentMode || 'UPI',
        causeName: causeTitle || 'General Relief & Hunger Fund',
        taxDeductionEligible: true,
        estimatedTaxSaved: taxDeducted,
        issuedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error during donation processing.' },
      { status: 500 }
    );
  }
}
