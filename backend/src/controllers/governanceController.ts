import { Request, Response } from 'express';

const boardMembers = [
  {
    name: 'Dr. Rajesh Vardhan',
    role: 'Founding President & Managing Trustee',
    bio: 'Former Healthcare Administrator with over 18 years of public welfare experience.',
    credentials: 'MBBS, MD (Public Health)',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Field Operations & Volunteer Mobilization',
    bio: 'Social Impact strategist who has led 400+ food distribution drives across North India.',
    credentials: 'MSW (Delhi School of Social Work)',
  },
  {
    name: 'Vikramaditya Rao',
    role: 'Treasurer & Financial Compliance Director',
    bio: 'Chartered Accountant specializing in Section 80G/12A NGO audits and statutory transparency.',
    credentials: 'FCA, B.Com (Hons)',
  },
];

const meFramework = [
  { stage: 'Stage 1: Input', metric: '₹1.5Cr Total Capital', desc: '100% audited donor capital allocated to hunger and education.' },
  { stage: 'Stage 2: Output', metric: '248,500 Meals Served', desc: 'Direct daily distribution to verified slum clusters and shelters.' },
  { stage: 'Stage 3: Outcome', metric: '4,120 Students Enrolled', desc: 'Zero dropout rate among sponsored girl children across 12 cities.' },
  { stage: 'Stage 4: Impact', metric: '88% Program Efficiency', desc: 'Independent 3rd-party M&E evaluation report certified clean.' },
];

export async function getGovernanceData(req: Request, res: Response) {
  return res.json({
    success: true,
    data: {
      boardMembers,
      meFramework,
      statutoryRegistration: {
        trustDeedNo: 'DEL-TRUST-2020-09812',
        darpanId: 'DL/2020/0268412',
        section80G: 'CIT(E)/80G/2021-22/A/10452',
        section12A: 'AAATI4958RE20214',
      },
    },
  });
}
