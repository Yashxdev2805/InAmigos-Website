import { NextResponse } from 'next/server';
import { BOARD_MEMBERS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      boardMembers: BOARD_MEMBERS,
      statutoryDetails: {
        registrationNo: 'AAATI4958RE20214',
        darpanId: 'DL/2020/0268412',
        sec80G: 'CIT(E)/80G/2021-22/A/10452',
      },
    },
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=600',
    },
  });
}
