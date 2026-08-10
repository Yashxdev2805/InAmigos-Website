import { NextResponse } from 'next/server';
import { DYNAMIC_STATS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: DYNAMIC_STATS,
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=120',
    },
  });
}
