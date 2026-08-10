import { NextResponse } from 'next/server';
import { TRANSPARENCY_DOCS } from '@/lib/data';

export async function GET() {
  const fundUtilization = {
    programDirect: 88, // 88%
    administrative: 8,
    fundraising: 4,
    auditor: 'ICAI Chartered Accountants',
    form10BFiled: true,
  };

  return NextResponse.json({
    success: true,
    fundUtilization,
    data: TRANSPARENCY_DOCS,
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=600',
    },
  });
}
