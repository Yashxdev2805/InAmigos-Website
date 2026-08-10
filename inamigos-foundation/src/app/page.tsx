'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LiveImpactCounters } from '@/components/LiveImpactCounters';
import { CausesSection } from '@/components/CausesSection';
import { TaxCalculator } from '@/components/TaxCalculator';
import { TransparencyHub } from '@/components/TransparencyHub';
import { GovernanceSection } from '@/components/GovernanceSection';
import { AdminPortal } from '@/components/AdminPortal';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { VolunteerModal } from '@/components/VolunteerModal';
import { EventRSVPModal } from '@/components/EventRSVPModal';
import { GROUND_EVENTS, GroundEvent, Cause } from '@/lib/data';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState<boolean>(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState<boolean>(false);

  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<GroundEvent | null>(null);
  const [initialDonateAmount, setInitialDonateAmount] = useState<number>(2500);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'volunteer') {
      setVolunteerModalOpen(true);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenDonateWithCause = (cause: Cause) => {
    setSelectedCause(cause);
    setInitialDonateAmount(cause.unitCost);
    setDonateModalOpen(true);
  };

  const handleOpenDonateWithAmount = (amount: number) => {
    setSelectedCause(null);
    setInitialDonateAmount(amount);
    setDonateModalOpen(true);
  };

  const handleOpenRsvp = (evt: GroundEvent) => {
    setSelectedEvent(evt);
    setRsvpModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Main Navbar Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDonate={() => {
          setSelectedCause(null);
          setDonateModalOpen(true);
        }}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenDonate={() => {
          setSelectedCause(null);
          setDonateModalOpen(true);
        }}
        onOpenVolunteer={() => setVolunteerModalOpen(true)}
        onNavigateTransparency={() => handleNavigate('transparency')}
      />

      {/* Real-time Live Impact Counters */}
      <LiveImpactCounters />

      {/* Interactive Causes Directory */}
      <CausesSection onSelectCause={handleOpenDonateWithCause} />

      {/* Official 80G Income Tax Calculator */}
      <TaxCalculator onOpenDonateWithAmount={handleOpenDonateWithAmount} />

      {/* Ground Drives & Event RSVP Portal */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800">
                <Calendar className="w-4 h-4 text-purple-600" />
                Upcoming Ground Relief Drives
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Join An Upcoming <span className="gradient-text-emerald">Field Drive Near You</span>
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Reserve your volunteer shift for upcoming food distribution, teaching workshops, and tree plantation drives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GROUND_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="clean-card clean-card-hover rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 text-purple-800 border border-purple-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                      {evt.type}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                    <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-2 text-purple-700 font-bold">
                        <Calendar className="w-3.5 h-3.5" /> {evt.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {evt.location}, {evt.city}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{evt.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenRsvp(evt)}
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4 text-purple-600" /> RSVP Shift Slot ({evt.volunteersRegistered}/{evt.volunteersNeeded} Registered)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Transparency & Section 80G Compliance Hub */}
      <TransparencyHub />

      {/* Governance & M&E Framework */}
      <GovernanceSection />

      {/* RBAC Administrator CRM Portal */}
      <AdminPortal />

      {/* Main Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        selectedCause={selectedCause}
        initialAmount={initialDonateAmount}
      />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <EventRSVPModal
        isOpen={rsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
        event={selectedEvent}
      />
    </main>
  );
}
