import { Request, Response } from 'express';

export async function applyVolunteer(req: Request, res: Response) {
  try {
    const { name, email, phone, city, roleTitle, availability } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing mandatory volunteer fields.' });
    }

    const applicationRef = 'IAM-VOL-' + Math.floor(100000 + Math.random() * 900000);

    return res.json({
      success: true,
      message: 'Volunteer application submitted and assigned.',
      data: {
        applicationRef,
        name,
        email,
        phone,
        city: city || 'New Delhi',
        roleTitle: roleTitle || 'Field Distribution Lead',
        availability: availability || 'Weekends',
        status: 'APPLIED',
        assignedBuddy: 'Priya Sharma (City Coordinator)',
        whatsappGroupLink: 'https://chat.whatsapp.com/demo-inamigos-volunteers',
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process volunteer application.' });
  }
}

export async function listVolunteers(req: Request, res: Response) {
  return res.json({
    success: true,
    total: 1850,
    data: [
      { id: 'v-1', name: 'Ananya Roy', city: 'New Delhi', role: 'Field Lead', status: 'ACTIVE' },
      { id: 'v-2', name: 'Rohan Das', city: 'Mumbai', role: 'Teaching Mentor', status: 'ACTIVE' },
    ],
  });
}
