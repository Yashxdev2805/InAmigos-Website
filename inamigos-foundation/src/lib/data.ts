export interface Cause {
  id: string;
  title: string;
  slug: string;
  category: 'Food' | 'Education' | 'Healthcare' | 'Environment' | 'Relief';
  shortDesc: string;
  fullDesc: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  impactRatio: string; // e.g. "₹500 = 10 Meals"
  unitCost: number; // ₹500
  unitLabel: string; // "10 Meals"
  urgency: 'High' | 'Critical' | 'Ongoing';
  location: string;
}

export interface GroundEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  type: 'Food Drive' | 'Tree Plantation' | 'Medical Camp' | 'Teaching Workshop';
  volunteersNeeded: number;
  volunteersRegistered: number;
  image: string;
  description: string;
}

export interface TransparencyDoc {
  id: string;
  title: string;
  category: 'Tax Exemption' | 'Annual Report' | 'Legal Registration' | 'Audit Statement';
  fileSize: string;
  year: string;
  refNumber: string;
  downloadUrl: string;
}

export interface BoardMember {
  name: string;
  role: string;
  qualification: string;
  bio: string;
  image: string;
  email?: string;
  linkedIn?: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  commitment: string;
  type: 'Field' | 'Remote' | 'Hybrid';
  skills: string[];
  description: string;
}

export const DYNAMIC_STATS = {
  mealsServed: 248500,
  childrenEducated: 4120,
  volunteersActive: 1850,
  drivesCompleted: 430,
  citiesActive: 12,
  percentToPrograms: 88, // 88% direct to program
};

export const CAUSES_DATA: Cause[] = [
  {
    id: 'cause-1',
    title: 'Hunger Relief: Warm Meals for Underserved Families',
    slug: 'hunger-relief-warm-meals',
    category: 'Food',
    shortDesc: 'Providing fresh, nutritious cooked meals to daily wage workers and shelter homes across Delhi NCR and Mumbai.',
    fullDesc: 'Hunger remains a silent crisis. Through our mobile kitchen vans and volunteer distribution network, InAmigos Foundation serves over 2,500 fresh hygienic meals every single day. Your donation directly funds fresh grain, vegetables, and distribution logistics.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    targetAmount: 1500000,
    raisedAmount: 1180000,
    donorCount: 1420,
    impactRatio: '₹500 = 10 Fresh Meals',
    unitCost: 500,
    unitLabel: '10 Fresh Meals',
    urgency: 'Critical',
    location: 'Delhi, Mumbai, Bengaluru',
  },
  {
    id: 'cause-2',
    title: 'Shiksha Mission: Educating Girl Children in Rural Belts',
    slug: 'shiksha-mission-girl-education',
    category: 'Education',
    shortDesc: 'Sponsoring annual tuition fees, textbooks, uniforms, and digital tablets for underprivileged young girls.',
    fullDesc: 'Education is the ultimate poverty breaker. Our Shiksha Mission supports young girls from marginalized communities with comprehensive educational toolkits, after-school tutoring centers, and digital literacy tools to ensure zero dropouts.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    targetAmount: 2000000,
    raisedAmount: 1450000,
    donorCount: 980,
    impactRatio: '₹1,500 = 1 Girl’s Monthly Education',
    unitCost: 1500,
    unitLabel: "1 Girl's Education/Month",
    urgency: 'High',
    location: 'Rajasthan, UP, Bihar',
  },
  {
    id: 'cause-3',
    title: 'Community Health & Hygiene Kits Distribution',
    slug: 'health-hygiene-kits',
    category: 'Healthcare',
    shortDesc: 'Delivering essential medical diagnostic checkups and hygiene sanitation kits to slum clusters.',
    fullDesc: 'Preventative healthcare saves lives. We conduct free mobile health clinics providing doctor consultations, basic diagnostics, sanitary napkins, clean drinking water filters, and essential medicines to vulnerable communities.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    targetAmount: 1000000,
    raisedAmount: 760000,
    donorCount: 630,
    impactRatio: '₹1,000 = 2 Medical Hygiene Kits',
    unitCost: 1000,
    unitLabel: '2 Medical Kits',
    urgency: 'Ongoing',
    location: 'Delhi NCR, Jaipur',
  },
  {
    id: 'cause-4',
    title: 'Green India: Urban Plantation & Environmental Restoration',
    slug: 'green-india-plantation',
    category: 'Environment',
    shortDesc: 'Planting native shade and fruit trees across urban heat islands with 3-year survival tracking.',
    fullDesc: 'Combatting urban pollution requires sustained green cover. Our eco-volunteers plant native saplings and install drip watering systems with a verified 92% 3-year survival rate monitored by geotagged updates.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    targetAmount: 800000,
    raisedAmount: 620000,
    donorCount: 510,
    impactRatio: '₹300 = 1 Tree Sapling + 3-Yr Care',
    unitCost: 300,
    unitLabel: '1 Tree Sapling + Care',
    urgency: 'Ongoing',
    location: 'NCR, Pune, Hyderabad',
  },
];

export const GROUND_EVENTS: GroundEvent[] = [
  {
    id: 'evt-101',
    title: 'Mega Food Drive: Anand Vihar Railway Colony',
    date: 'Saturday, Aug 15, 2026',
    time: '09:00 AM - 01:00 PM',
    location: 'Anand Vihar Shelter Complex',
    city: 'New Delhi',
    type: 'Food Drive',
    volunteersNeeded: 50,
    volunteersRegistered: 38,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    description: 'Join our team as we prepare and distribute 1,500 hot nutritious meals and fruit packs to migrant workers and children.',
  },
  {
    id: 'evt-102',
    title: 'Weekend Shiksha & Art Workshop for Kids',
    date: 'Sunday, Aug 16, 2026',
    time: '10:00 AM - 02:00 PM',
    location: 'Dharavi Community Learning Center',
    city: 'Mumbai',
    type: 'Teaching Workshop',
    volunteersNeeded: 30,
    volunteersRegistered: 24,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    description: 'Conduct interactive storytelling, basic math games, and creative art sessions for 120 elementary students.',
  },
  {
    id: 'evt-103',
    title: 'Monsoon Plantation Drive: Ridge Forest Park',
    date: 'Saturday, Aug 22, 2026',
    time: '07:30 AM - 11:30 AM',
    location: 'Northern Ridge Bio-Park',
    city: 'Delhi NCR',
    type: 'Tree Plantation',
    volunteersNeeded: 60,
    volunteersRegistered: 52,
    image: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?q=80&w=800&auto=format&fit=crop',
    description: 'Planting 500 native saplings (Neem, Peepal, Jamun) with geotagging and protective tree guards.',
  },
];

export const TRANSPARENCY_DOCS: TransparencyDoc[] = [
  {
    id: 'doc-80g',
    title: 'Section 80G Tax Exemption Certificate',
    category: 'Tax Exemption',
    fileSize: '1.4 MB PDF',
    year: 'Permanent (Sec 80G(5))',
    refNumber: 'CIT(E)/80G/2021-22/A/10452',
    downloadUrl: '#',
  },
  {
    id: 'doc-12a',
    title: 'Section 12A Registration Certificate',
    category: 'Legal Registration',
    fileSize: '1.2 MB PDF',
    year: 'Valid 2021-2026',
    refNumber: 'AAATI4958RE20214',
    downloadUrl: '#',
  },
  {
    id: 'doc-darpan',
    title: 'NITI Aayog NGO Darpan Certificate',
    category: 'Legal Registration',
    fileSize: '890 KB PDF',
    year: 'Active Verified',
    refNumber: 'DL/2020/0268412',
    downloadUrl: '#',
  },
  {
    id: 'doc-audit-25',
    title: 'Audited Financial Statement & Form 10B (FY 2024-25)',
    category: 'Audit Statement',
    fileSize: '3.8 MB PDF',
    year: 'FY 2024-2025',
    refNumber: 'CA-AUDIT-2025-098',
    downloadUrl: '#',
  },
  {
    id: 'doc-annual-report',
    title: 'InAmigos Annual Impact & Governance Report 2025',
    category: 'Annual Report',
    fileSize: '6.5 MB PDF',
    year: '2024 - 2025',
    refNumber: 'IAM-AR-2025',
    downloadUrl: '#',
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: 'Dr. Aarav Sharma',
    role: 'Founder & Managing Trustee',
    qualification: 'Ph.D. Development Economics (IIT Delhi)',
    bio: 'Over 14 years of grassroots experience in non-profit management, social policy execution, and community development.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    email: 'aarav@inamigosfoundation.org.in',
  },
  {
    name: 'Priya Mukherjee, FCA',
    role: 'Treasurer & Finance Governance Lead',
    qualification: 'Fellow Chartered Accountant (ICAI)',
    bio: 'Oversees strict financial compliance, zero-corruption internal controls, and audited fund allocations for maximum donor transparency.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    email: 'priya.m@inamigosfoundation.org.in',
  },
  {
    name: 'Rohan Verma',
    role: 'Director of Ground Operations',
    qualification: 'M.S.W. (TISS Mumbai)',
    bio: 'Leads a network of 1,800+ youth volunteers across 12 cities, executing daily relief drives and educational camps.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    email: 'rohan.v@inamigosfoundation.org.in',
  },
  {
    name: 'Ananya Sen',
    role: 'Head of Volunteer Relations & Outreach',
    qualification: 'M.A. Public Policy (St. Xavier’s)',
    bio: 'Manages volunteer onboarding, training workshops, and university outreach programs across major Indian cities.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    email: 'ananya.s@inamigosfoundation.org.in',
  },
  {
    name: 'Vikramaditya Rao',
    role: 'Chief Compliance & Legal Counsel',
    qualification: 'LL.M. (National Law University)',
    bio: 'Ensures 100% compliance with Section 80G/12A regulations, NITI Aayog guidelines, and statutory audit filings.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    email: 'compliance@inamigosfoundation.org.in',
  },
  {
    name: 'Sunita Deshmukh',
    role: 'Senior Program Manager (Shiksha Mission)',
    qualification: 'M.Ed. (Delhi University)',
    bio: 'Directs educational curriculum development, digital tablet distribution, and girls scholarship initiatives.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&auto=format&fit=crop',
    email: 'sunita.d@inamigosfoundation.org.in',
  },
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'v-role-1',
    title: 'Field Distribution Drive Captain',
    commitment: '3-4 Hours / Weekend',
    type: 'Field',
    skills: ['Team Leadership', 'On-ground Coordination', 'Logistics'],
    description: 'Lead weekend food and relief distribution drives, manage volunteer teams, and coordinate with shelter administrators.',
  },
  {
    id: 'v-role-2',
    title: 'Youth Educator & Mentor',
    commitment: '2 Hours / Week',
    type: 'Hybrid',
    skills: ['Teaching', 'English / Math Literacy', 'Mentorship'],
    description: 'Teach basic English, mathematics, and digital skills to children at our weekend learning centers or online sessions.',
  },
  {
    id: 'v-role-3',
    title: 'Digital Content & Impact Storyteller',
    commitment: 'Flexible / Remote',
    type: 'Remote',
    skills: ['Graphic Design', 'Video Editing', 'Social Media'],
    description: 'Create compelling visual stories, infographics, and beneficiary impact videos for our social channels.',
  },
];

export const GEOTAGGED_LOCATIONS = [
  { city: 'New Delhi (NCR)', lat: 28.6139, lng: 77.209, beneficiaries: '110,000+', drives: 180 },
  { city: 'Mumbai', lat: 19.076, lng: 72.8777, beneficiaries: '65,000+', drives: 110 },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, beneficiaries: '35,000+', drives: 60 },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873, beneficiaries: '22,000+', drives: 45 },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, beneficiaries: '16,000+', drives: 35 },
];
