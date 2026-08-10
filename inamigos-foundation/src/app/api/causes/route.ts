import { NextResponse } from 'next/server';
import { CAUSES_DATA } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: CAUSES_DATA.length,
    data: CAUSES_DATA,
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300',
    },
  });
}
