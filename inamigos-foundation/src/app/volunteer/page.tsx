'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VolunteerModal } from '@/components/VolunteerModal';
import { DonationModal } from '@/components/DonationModal';
import { generateVolunteerCertificatePDF } from '@/lib/pdf-certificate';
import { Users, Heart, Award, CheckCircle2, ArrowRight, Download } from 'lucide-react';

export default function VolunteerPage() {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const sampleVolunteers = [
    { name: 'Ananya Roy', city: 'New Delhi', role: 'Field Distribution Lead', hours: 140 },
    { name: 'Rohan Das', city: 'Mumbai', role: 'Shiksha Teaching Mentor', hours: 95 },
    { name: 'Pooja Sharma', city: 'Bengaluru', role: 'Health Camp Coordinator', hours: 120 },
  ];

  const handleDownloadDemoCert = (vol: typeof sampleVolunteers[0]) => {
    generateVolunteerCertificatePDF({
      certNumber: 'IAM-CERT-' + Math.floor(100000 + Math.random() * 900000),
      volunteerName: vol.name,
      roleTitle: vol.role,
      city: vol.city,
      hoursLogged: vol.hours,
      issuedDate: new Date().toLocaleDateString('en-IN'),
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar
        activeSection="volunteer"
        onNavigate={(sec) => {
          if (sec === 'volunteer') setVolunteerModalOpen(true);
          else window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
      />

      <div className="py-12 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
            1,850+ Active Field Volunteers Nationwide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Join the <span className="gradient-text-emerald">Ground Impact Force</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Sub-3-minute micro-application wizard. Get assigned a city buddy, join our local WhatsApp squad, and receive an official verified Certificate of Excellence for your hours.
          </p>

          <button
            onClick={() => setVolunteerModalOpen(true)}
            className="px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2"
          >
            Apply to Volunteer in 3 Minutes <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Verified Volunteer Showcase & Sample Certificates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Verified Volunteer Experience Certificates
            </h2>
            <p className="text-xs text-slate-500">
              Every volunteer receives a stamped, downloadable PDF certificate upon completing field hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVolunteers.map((vol, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg">
                    {vol.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {vol.hours} Hours Logged
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">{vol.name}</h3>
                  <p className="text-xs text-slate-500">{vol.role} • {vol.city}</p>
                </div>

                <button
                  onClick={() => handleDownloadDemoCert(vol)}
                  className="w-full py-2.5 rounded-xl text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Certificate Sample
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        onNavigate={(sec) => {
          window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />
    </main>
  );
}
