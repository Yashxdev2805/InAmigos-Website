import { Request, Response } from 'express';

export async function getTransparencyDocs(req: Request, res: Response) {
  const documents = [
    {
      id: 'doc-80g',
      title: 'Section 80G Tax Exemption Certificate',
      category: 'Tax Exemption',
      fileSize: '1.4 MB PDF',
      year: 'Permanent (Sec 80G(5))',
      refNumber: 'CIT(E)/80G/2021-22/A/10452',
    },
    {
      id: 'doc-12a',
      title: 'Section 12A Registration Certificate',
      category: 'Legal Registration',
      fileSize: '1.2 MB PDF',
      year: 'Valid 2021-2026',
      refNumber: 'AAATI4958RE20214',
    },
    {
      id: 'doc-darpan',
      title: 'NITI Aayog NGO Darpan Certificate',
      category: 'Legal Registration',
      fileSize: '890 KB PDF',
      year: 'Active Verified',
      refNumber: 'DL/2020/0268412',
    },
    {
      id: 'doc-audit-25',
      title: 'Audited Financial Statement & Form 10B (FY 2024-25)',
      category: 'Audit Statement',
      fileSize: '3.8 MB PDF',
      year: 'FY 2024-2025',
      refNumber: 'CA-AUDIT-2025-098',
    },
  ];

  const fundUtilization = {
    programDirect: 88, // 88%
    administrative: 8,
    fundraising: 4,
    auditor: 'ICAI Chartered Accountants',
    form10BFiled: true,
  };

  return res.json({
    success: true,
    fundUtilization,
    data: documents,
  });
}
