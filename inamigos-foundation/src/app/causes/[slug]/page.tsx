'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { VolunteerModal } from '@/components/VolunteerModal';
import { CAUSES_DATA, Cause } from '@/lib/data';
import { Heart, ShieldCheck, MapPin, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CauseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const cause: Cause | undefined = CAUSES_DATA.find((c) => c.slug === slug) || CAUSES_DATA[0];

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  const percentage = Math.min(100, Math.round((cause.raisedAmount / cause.targetAmount) * 100));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar
        activeSection="causes"
        onNavigate={(sec) => {
          if (sec === 'volunteer') setVolunteerModalOpen(true);
          else window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/causes"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Causes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cause Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-video">
              <img
                src={cause.image}
                alt={cause.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                {cause.category}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Geotagged Locations: <strong>{cause.location}</strong></span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {cause.title}
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {cause.fullDesc || cause.shortDesc}
                </p>
              </div>

              {/* Direct Impact Unit Ask */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tangible Impact Calculator
                  </span>
                  <p className="text-lg font-extrabold text-emerald-900">
                    {cause.impactRatio}
                  </p>
                </div>
                <button
                  onClick={() => setDonateModalOpen(true)}
                  className="px-5 py-3 rounded-2xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
                >
                  Sponsor Now
                </button>
              </div>

              {/* OWASP & Sec 80G Verification Pill */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="space-y-0.5">
                  <strong className="text-slate-900 font-bold">100% Tax Deductible under Section 80G</strong>
                  <p className="text-slate-500">Instant PDF receipt with URN AAATI4958RE20214 generated upon payment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Funding Card Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-6 sticky top-24">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{cause.raisedAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    raised of ₹{cause.targetAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-600 font-bold pt-1">
                  <span>{percentage}% Funded</span>
                  <span>{cause.donorCount} Donors</span>
                </div>
              </div>

              <button
                onClick={() => setDonateModalOpen(true)}
                className="w-full py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                Donate to this Cause
              </button>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct beneficiary distribution tracking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero administrative deduction (100% to cause)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        onNavigate={(sec) => {
          window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        selectedCause={cause}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />
    </main>
  );
}
