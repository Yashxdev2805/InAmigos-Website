import { jsPDF } from 'jspdf';

export interface VolunteerCertData {
  certNumber: string;
  volunteerName: string;
  roleTitle: string;
  city: string;
  hoursLogged: number;
  issuedDate: string;
}

export function generateVolunteerCertificatePDF(data: VolunteerCertData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Certificate Outer Border
  doc.setDrawColor(4, 120, 87); // Emerald 700
  doc.setLineWidth(3);
  doc.rect(8, 8, 281, 194);

  doc.setDrawColor(217, 119, 6); // Amber 600
  doc.setLineWidth(0.8);
  doc.rect(12, 12, 273, 186);

  // Header Banner
  doc.setFillColor(4, 120, 87);
  doc.rect(12, 12, 273, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('INAMIGOS FOUNDATION', 148.5, 26, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('CERTIFICATE OF VOLUNTEER EXCELLENCE', 148.5, 34, { align: 'center' });

  // Main Body
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.text('This is to certify that', 148.5, 60, { align: 'center' });

  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(4, 120, 87);
  doc.text(data.volunteerName.toUpperCase(), 148.5, 78, { align: 'center' });

  doc.setDrawColor(4, 120, 87);
  doc.setLineWidth(0.5);
  doc.line(68.5, 82, 228.5, 82);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(
    `has served as a dedicated ${data.roleTitle} in ${data.city}, logging`,
    148.5,
    98,
    { align: 'center' }
  );

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(217, 119, 6);
  doc.text(`${data.hoursLogged} VOLUNTEER HOURS`, 148.5, 114, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(
    'InAmigos Foundation recognizes their outstanding leadership, dedication to hunger relief, and community welfare.',
    148.5,
    130,
    { align: 'center' }
  );

  // Footer Metadata & Signatures
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Cert Ref: ${data.certNumber}`, 20, 165);
  doc.text(`Issued Date: ${data.issuedDate}`, 20, 172);
  doc.text('Section 80G Registered NGO | Reg No: AAATI4958RE20214', 20, 179);

  // Signature Lines
  doc.setDrawColor(100, 116, 139);
  doc.line(190, 165, 260, 165);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Managing Trustee', 225, 172, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('InAmigos Foundation Board', 225, 177, { align: 'center' });

  // Download PDF
  doc.save(`InAmigos_Volunteer_Certificate_${data.certNumber}.pdf`);
}
