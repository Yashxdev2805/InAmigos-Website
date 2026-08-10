import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

  // Rate limiting check (5 applications per minute)
  const limitResult = rateLimit(ip, 5, 60000);
  if (!limitResult.success) {
    return NextResponse.json(
      { error: 'Too many volunteer applications submitted. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, city, roleTitle, availability } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: name, email, or phone.' },
        { status: 400 }
      );
    }

    const applicationRef = 'IAM-VOL-' + Math.floor(100000 + Math.random() * 900000);
    const assignedBuddy = 'Priya Sharma (City Coordinator)';

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully.',
      data: {
        applicationRef,
        name,
        email,
        phone,
        city: city || 'New Delhi',
        roleTitle: roleTitle || 'Field Distribution Lead',
        availability: availability || 'Weekends',
        status: 'APPLIED',
        assignedBuddy,
        whatsappGroupLink: 'https://chat.whatsapp.com/demo-inamigos-volunteers',
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error processing volunteer application.' },
      { status: 500 }
    );
  }
}
