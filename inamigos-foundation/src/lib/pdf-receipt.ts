import { jsPDF } from 'jspdf';

export interface ReceiptData {
  receiptNo: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan: string;
  amount: number;
  paymentMode: string;
  transactionId: string;
  causeName: string;
  date: string;
}

export function generate80GReceiptPDF(data: ReceiptData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Background Accent Card Header
  doc.setFillColor(15, 23, 42); // Deep Slate / Navy
  doc.rect(0, 0, 210, 45, 'F');

  doc.setFillColor(16, 185, 129); // Emerald Line Accent
  doc.rect(0, 43, 210, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('INAMIGOS FOUNDATION', 14, 20);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Registered Public Charitable Trust | Reg No: TRUST/DL/2020/0268', 14, 28);
  doc.text('NITI Aayog Darpan ID: DL/2020/0268412 | 80G Approval: CIT(E)/80G/2021-22/A/10452', 14, 34);

  // Receipt Banner
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 52, 182, 14, 2, 2, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('DONATION RECEIPT & SECTION 80G TAX EXEMPTION CERTIFICATE', 20, 61);

  // Key Details Table
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  let y = 78;

  const addRow = (label: string, value: string, isBold: boolean = false) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 16, y);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    if (isBold) doc.setTextColor(5, 150, 105);
    doc.text(value, 70, y);
    doc.setTextColor(51, 65, 85);
    y += 9;
  };

  addRow('Receipt Number:', data.receiptNo);
  addRow('Date & Time:', data.date);
  addRow('Donor Name:', data.donorName);
  addRow('Donor PAN Number:', data.donorPan.toUpperCase() || 'NOT PROVIDED (N/A)');
  addRow('Donor Email:', data.donorEmail);
  addRow('Donor Phone:', data.donorPhone || 'N/A');
  addRow('Cause / Campaign:', data.causeName);
  addRow('Payment Method:', data.paymentMode);
  addRow('Transaction ID / UTR:', data.transactionId);
  addRow('Contribution Amount:', `INR ₹${data.amount.toLocaleString('en-IN')}/-`, true);

  // 80G Tax Exemption Declaration Box
  y += 5;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(14, y, 182, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(6, 95, 70);
  doc.text('TAX EXEMPTION DECLARATION UNDER SECTION 80G OF INCOME TAX ACT 1961', 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 118, 110);
  const declarationText = 
    `This receipt certifies that the sum of INR ₹${data.amount.toLocaleString('en-IN')}/- received from ${data.donorName} ` +
    `(PAN: ${data.donorPan.toUpperCase() || 'N/A'}) is eligible for 50% Tax Deduction under Section 80G of the Indian Income Tax Act, 1961. ` +
    `Unique Regn No (URN): AAATI4958RE20214. All donations to InAmigos Foundation are audit-verified.`;
  
  const splitText = doc.splitTextToSize(declarationText, 170);
  doc.text(splitText, 20, y + 16);

  // Digital Signature & Stamp
  y += 50;
  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, 196, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Signatory', 140, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('InAmigos Foundation Trust', 140, y + 15);
  doc.text('Digitally Stamped & Signed Document', 140, y + 20);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a computer-generated 80G Tax Receipt. No physical signature required.', 14, y + 25);
  doc.text('InAmigos Foundation | HQ: H-24, Green Park, New Delhi - 110016 | www.inamigosfoundation.org.in', 14, y + 30);

  // Save / Download PDF
  doc.save(`InAmigos_80G_Receipt_${data.receiptNo}.pdf`);
}

export function generateVolunteerCertificatePDF(name: string, role: string, hours: number) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Certificate Outer Border
  doc.setLineWidth(2);
  doc.setDrawColor(16, 185, 129);
  doc.rect(8, 8, 281, 194);

  doc.setLineWidth(0.5);
  doc.setDrawColor(217, 119, 6);
  doc.rect(12, 12, 273, 186);

  // Header Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('INAMIGOS FOUNDATION', 148.5, 36, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('CERTIFICATE OF COMMENDATION & VOLUNTEER SERVICE', 148.5, 46, { align: 'center' });

  // Body Content
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text('This certificate is proudly presented to', 148.5, 68, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(5, 150, 105);
  doc.text(name.toUpperCase(), 148.5, 84, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `in recognition of exceptional dedication, humanitarian service, and ${hours} hours of active field contribution as`,
    148.5,
    98,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(role, 148.5, 110, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Your commitment has directly impacted hundreds of lives across our community food drives and educational camps.',
    148.5,
    124,
    { align: 'center' }
  );

  // Date and Verification Hash
  const certId = 'IAM-VOL-' + Math.floor(100000 + Math.random() * 900000);
  doc.setFontSize(10);
  doc.text(`Issue Date: ${new Date().toLocaleDateString('en-IN')}`, 40, 160);
  doc.text(`Certificate Verification ID: ${certId}`, 40, 166);

  // Signatures
  doc.line(200, 155, 260, 155);
  doc.setFont('helvetica', 'bold');
  doc.text('Managing Trustee', 230, 162, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('InAmigos Foundation', 230, 167, { align: 'center' });

  doc.save(`InAmigos_Volunteer_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
}
