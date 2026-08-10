import { NextResponse } from 'next/server';

export async function GET() {
  const donations = [
    { id: 'DON-9821', donorName: 'Vikramaditya Sharma', amount: '₹10,000', pan: 'ABCDE1234F', date: '2026-08-09', cause: 'Hunger Relief', status: '80G Issued' },
    { id: 'DON-9822', donorName: 'Ananya Roy', amount: '₹2,500', pan: 'FGHIJ5678K', date: '2026-08-08', cause: 'Shiksha Mission', status: '80G Issued' },
    { id: 'DON-9823', donorName: 'Siddharth Nair', amount: '₹5,000', pan: 'LMNOP9012Q', date: '2026-08-08', cause: 'Community Health', status: '80G Issued' },
  ];

  const volunteers = [
    { id: 'v-101', name: 'Rohan Mehta', email: 'rohan@example.com', city: 'New Delhi', role: 'Field Distribution Lead', status: 'APPLIED' },
    { id: 'v-102', name: 'Kavita Singh', email: 'kavita@example.com', city: 'Mumbai', role: 'Shiksha Teaching Mentor', status: 'ORIENTATION_SENT' },
  ];

  const stats = {
    totalRaisedFY26: 4010000,
    uniqueDonors: 3540,
    activeVolunteers: 1850,
    pendingVolunteers: 14,
    auditHealth: '100% Clean',
  };

  return NextResponse.json({
    success: true,
    stats,
    donations,
    volunteers,
    updatedAt: new Date().toISOString(),
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
