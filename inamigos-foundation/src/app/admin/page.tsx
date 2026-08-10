'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AdminPortal } from '@/components/AdminPortal';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { VolunteerModal } from '@/components/VolunteerModal';

export default function AdminPage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar
        activeSection="admin"
        onNavigate={(sec) => {
          if (sec === 'volunteer') setVolunteerModalOpen(true);
          else window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
      />

      <div className="py-10 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
            RBAC Protected Internal Management System
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Internal <span className="gradient-text-emerald">Admin Control Center</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Manage donor CRM ledgers, review pending volunteer applications, and export audited Section 80G tax receipt records.
          </p>
        </div>
      </div>

      <AdminPortal />

      <Footer
        onNavigate={(sec) => {
          window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />
    </main>
  );
}
