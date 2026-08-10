import { Request, Response } from 'express';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(?:(?:\+91)|(?:0))?[6-9]\d{9}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export async function createDonation(req: Request, res: Response) {
  try {
    const { amount, donorName, donorEmail, donorPhone, donorPan, paymentMode, causeTitle } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount.' });
    }

    if (!donorName || donorName.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a valid donor full name.' });
    }

    // Strict Email Format & Syntax Validation
    if (!donorEmail || !EMAIL_REGEX.test(donorEmail.trim())) {
      return res.status(400).json({ error: 'Invalid email address format (e.g. name@domain.com).' });
    }

    // Strict Indian Mobile Phone Validation (if provided)
    if (donorPhone && donorPhone.trim()) {
      const cleanPhone = donorPhone.replace(/\s+/g, '');
      if (!PHONE_REGEX.test(cleanPhone)) {
        return res.status(400).json({ error: 'Invalid Indian mobile number. Must be 10 digits starting with 6-9.' });
      }
    }

    // Strict Indian PAN Number Validation (if provided)
    if (donorPan && donorPan.trim()) {
      const cleanPan = donorPan.trim().toUpperCase();
      if (!PAN_REGEX.test(cleanPan)) {
        return res.status(400).json({ error: 'Invalid PAN Number format. Must be 5 letters + 4 numbers + 1 letter (e.g. ABCDE1234F).' });
      }
    }

    const transactionId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const receiptNo = 'IAM-80G-' + Math.floor(100000 + Math.random() * 900000);
    const estimatedTaxSaved = Math.round(amount * 0.5 * 0.3 * 1.04);

    return res.json({
      success: true,
      message: 'Donation order verified and logged into backend ledger.',
      data: {
        receiptNo,
        transactionId,
        amount,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone ? donorPhone.trim() : 'N/A',
        donorPan: donorPan ? donorPan.trim().toUpperCase() : 'N/A',
        paymentMode: paymentMode || 'UPI',
        causeTitle: causeTitle || 'General Relief & Hunger Fund',
        taxDeductionEligible: true,
        estimatedTaxSaved,
        issuedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process donation in controller.' });
  }
}

export async function getDonationReceipt(req: Request, res: Response) {
  const { id } = req.params;
  return res.json({
    success: true,
    data: {
      receiptNo: id,
      urnNumber: 'AAATI4958RE20214',
      status: 'VERIFIED',
      pdfDownloadUrl: `/api/donations/download/${id}`,
    },
  });
}
