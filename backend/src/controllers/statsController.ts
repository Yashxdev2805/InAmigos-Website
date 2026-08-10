import { Request, Response } from 'express';

export async function getLiveStats(req: Request, res: Response) {
  const stats = {
    mealsServed: 248500,
    childrenEducated: 4120,
    volunteersActive: 1850,
    drivesCompleted: 430,
    citiesActive: 12,
    percentToPrograms: 88,
    lastUpdated: new Date().toISOString(),
  };

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');
  return res.json({
    success: true,
    data: stats,
  });
}
