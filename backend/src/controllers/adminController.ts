import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Admin Authentication Endpoint
 */
export async function adminLogin(req: Request, res: Response) {
  const { password } = req.body;

  if (password !== 'admin123' && password !== 'inamigos2026') {
    return res.status(401).json({ error: 'Invalid admin security credentials.' });
  }

  const secret = process.env.JWT_SECRET || 'inamigos_jwt_super_secret_2026';
  const token = jwt.sign(
    { id: 'usr-admin-1', email: 'admin@inamigosfoundation.org.in', role: 'SUPER_ADMIN' },
    secret,
    { expiresIn: '8h' }
  );

  return res.json({
    success: true,
    message: 'Admin authentication successful.',
    token,
    user: {
      name: 'Super Admin',
      email: 'admin@inamigosfoundation.org.in',
      role: 'SUPER_ADMIN',
    },
  });
}

/**
 * Fetch Donor CRM Ledger & Volunteer Review Queue
 */
export async function getCRMDashboard(req: Request, res: Response) {
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

  return res.json({
    success: true,
    stats,
    donations,
    volunteers,
  });
}

/**
 * Update Volunteer Status (APPLIED -> ACTIVE)
 */
export async function updateVolunteerStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  return res.json({
    success: true,
    message: `Volunteer ${id} status updated to ${status}.`,
    data: { id, status },
  });
}
