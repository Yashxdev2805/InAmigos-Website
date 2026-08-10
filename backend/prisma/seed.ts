import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[+] Starting Phase 2 Database Seeding...');

  // 1. Seed Super Admin Account
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@inamigosfoundation.org.in' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@inamigosfoundation.org.in',
      phone: '+91 98100 12345',
      role: 'SUPER_ADMIN',
      passwordHash,
    },
  });
  console.log(`[V] Admin Created: ${admin.email}`);

  // 2. Seed Initial Causes
  const causes = [
    {
      title: 'Hunger Relief: Warm Meals for Underserved Families',
      slug: 'hunger-relief-warm-meals',
      category: 'Food',
      shortDesc: 'Providing fresh, nutritious cooked meals to daily wage workers and shelter homes across Delhi NCR and Mumbai.',
      targetAmount: 1500000,
      raisedAmount: 1180000,
      donorCount: 1420,
      impactRatio: '₹500 = 10 Fresh Meals',
      unitCost: 500,
    },
    {
      title: 'Shiksha Mission: Educating Girl Children in Rural Belts',
      slug: 'shiksha-mission-girl-education',
      category: 'Education',
      shortDesc: 'Sponsoring annual tuition fees, textbooks, uniforms, and digital tablets for underprivileged young girls.',
      targetAmount: 2000000,
      raisedAmount: 1450000,
      donorCount: 980,
      impactRatio: '₹1,500 = 1 Girl’s Monthly Education',
      unitCost: 1500,
    },
    {
      title: 'Community Health & Hygiene Kits Distribution',
      slug: 'health-hygiene-kits',
      category: 'Healthcare',
      shortDesc: 'Delivering essential medical diagnostic checkups and hygiene sanitation kits to slum clusters.',
      targetAmount: 1000000,
      raisedAmount: 760000,
      donorCount: 630,
      impactRatio: '₹1,000 = 2 Medical Hygiene Kits',
      unitCost: 1000,
    },
  ];

  for (const c of causes) {
    await prisma.cause.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
  console.log('[V] Initial Causes Seeded.');

  console.log('[+] Phase 2 Database Seeding Completed Successfully.');
}

main()
  .catch((e) => {
    console.error('[-] Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
