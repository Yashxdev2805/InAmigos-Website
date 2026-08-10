import { NextResponse } from 'next/server';
import { GROUND_EVENTS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: GROUND_EVENTS.length,
    data: GROUND_EVENTS,
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300',
    },
  });
}
