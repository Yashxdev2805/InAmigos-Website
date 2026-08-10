import { Request, Response } from 'express';

const eventsData = [
  {
    id: 'evt-1',
    title: 'Delhi-NCR Sunday Mega Food Distribution Drive',
    date: 'Sunday, 17 Aug 2026',
    time: '09:00 AM - 01:00 PM',
    location: 'Kashmere Gate Shelter & Yamuna Pushta Slums',
    city: 'New Delhi',
    type: 'Food Drive',
    volunteersNeeded: 45,
    volunteersRegistered: 38,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    description: 'Help pack and distribute 2,500 fresh, warm meal boxes to daily wage workers and homeless families.',
  },
  {
    id: 'evt-2',
    title: 'Weekend Shiksha Math & Digital Literacy Workshop',
    date: 'Saturday, 23 Aug 2026',
    time: '10:00 AM - 02:00 PM',
    location: 'Community Centre, Sector 12, Noida',
    city: 'Noida',
    type: 'Teaching Drive',
    volunteersNeeded: 20,
    volunteersRegistered: 16,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    description: 'Teach basic arithmetic, English reading, and foundational computer skills to primary school children.',
  },
  {
    id: 'evt-3',
    title: 'Green India 1,000 Tree Plantation Drive',
    date: 'Sunday, 31 Aug 2026',
    time: '07:00 AM - 11:00 AM',
    location: 'Aravalli Biodiversity Park, Gurugram',
    city: 'Gurugram',
    type: 'Environment',
    volunteersNeeded: 60,
    volunteersRegistered: 49,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    description: 'Join our environmental team to plant 1,000 native saplings with geotagged survival tracking.',
  },
];

export async function getEvents(req: Request, res: Response) {
  return res.json({
    success: true,
    total: eventsData.length,
    data: eventsData,
  });
}

export async function registerEventRSVP(req: Request, res: Response) {
  try {
    const { eventId, name, email, phone, role } = req.body;

    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing mandatory RSVP fields.' });
    }

    const rsvpRef = 'RSVP-' + Math.floor(100000 + Math.random() * 900000);

    return res.json({
      success: true,
      message: 'Ground drive RSVP shift reserved.',
      data: {
        rsvpRef,
        eventId,
        name,
        email,
        phone,
        role: role || 'Field Logistics Assistant',
        shiftStatus: 'CONFIRMED',
        registeredAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process event RSVP.' });
  }
}
