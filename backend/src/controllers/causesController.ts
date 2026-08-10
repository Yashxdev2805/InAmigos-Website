import { Request, Response } from 'express';

const causesData = [
  {
    id: 'cause-1',
    title: 'Hunger Relief: Warm Meals for Underserved Families',
    slug: 'hunger-relief-warm-meals',
    category: 'Food',
    shortDesc: 'Providing fresh, nutritious cooked meals to daily wage workers and shelter homes across Delhi NCR and Mumbai.',
    fullDesc: 'Every day, thousands of daily wage workers and homeless families go to sleep on empty stomachs. InAmigos Foundation operates mobile food distribution vans that serve fresh, hygienic, balanced meals directly to slum clusters and shelter homes.',
    targetAmount: 1500000,
    raisedAmount: 1180000,
    donorCount: 1420,
    impactRatio: '₹500 = 10 Fresh Meals',
    unitCost: 500,
    unitLabel: 'Meals',
    urgency: 'Critical',
    location: 'Delhi NCR, Mumbai, Bengaluru',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'cause-2',
    title: 'Shiksha Mission: Educating Girl Children in Rural Belts',
    slug: 'shiksha-mission-girl-education',
    category: 'Education',
    shortDesc: 'Sponsoring annual tuition fees, textbooks, uniforms, and digital tablets for underprivileged young girls.',
    fullDesc: 'Education is the ultimate equalizer. Our Shiksha Mission supports young girls from low-income families by covering full tuition fees, providing learning kits, uniforms, and mentorship to prevent school dropouts.',
    targetAmount: 2000000,
    raisedAmount: 1450000,
    donorCount: 980,
    impactRatio: '₹1,500 = 1 Girl’s Monthly Education',
    unitCost: 1500,
    unitLabel: 'Student Sponsorships',
    urgency: 'High',
    location: 'Rajasthan, UP, Bihar',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'cause-3',
    title: 'Community Health & Hygiene Kits Distribution',
    slug: 'health-hygiene-kits',
    category: 'Healthcare',
    shortDesc: 'Delivering essential medical diagnostic checkups and hygiene sanitation kits to slum clusters.',
    fullDesc: 'Preventable infections and lack of basic hygiene supplies affect millions in urban slums. Our medical teams organize free health diagnostic camps and distribute hygiene sanitation kits containing soaps, sanitizers, and first-aid supplies.',
    targetAmount: 1000000,
    raisedAmount: 760000,
    donorCount: 630,
    impactRatio: '₹1,000 = 2 Medical Hygiene Kits',
    unitCost: 1000,
    unitLabel: 'Hygiene Kits',
    urgency: 'Ongoing',
    location: 'Delhi NCR, Jaipur',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
  },
];

export async function getCauses(req: Request, res: Response) {
  return res.json({
    success: true,
    total: causesData.length,
    data: causesData,
  });
}

export async function getCauseBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  const cause = causesData.find((c) => c.slug === slug);

  if (!cause) {
    return res.status(404).json({ error: 'Cause campaign not found.' });
  }

  return res.json({
    success: true,
    data: cause,
  });
}
