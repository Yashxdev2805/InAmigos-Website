'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CausesSection } from '@/components/CausesSection';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { VolunteerModal } from '@/components/VolunteerModal';
import { Cause } from '@/lib/data';

export default function CausesPage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);

  const handleSelectCause = (cause: Cause) => {
    setSelectedCause(cause);
    setDonateModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar
        activeSection="causes"
        onNavigate={(sec) => {
          if (sec === 'volunteer') setVolunteerModalOpen(true);
          else window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => {
          setSelectedCause(null);
          setDonateModalOpen(true);
        }}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
      />

      <div className="py-10 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
            Direct Metric-Tied Relief Campaigns
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Active Campaigns & <span className="gradient-text-emerald">Relief Causes</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Sponsor hot cooked meals, girl child education kits, or community health diagnostic drives with instant 80G tax exemption receipts.
          </p>
        </div>
      </div>

      <CausesSection onSelectCause={handleSelectCause} />

      <Footer
        onNavigate={(sec) => {
          window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        selectedCause={selectedCause}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />
    </main>
  );
}
