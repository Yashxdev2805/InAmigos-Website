'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EventRSVPModal } from '@/components/EventRSVPModal';
import { DonationModal } from '@/components/DonationModal';
import { VolunteerModal } from '@/components/VolunteerModal';
import { GROUND_EVENTS, GroundEvent } from '@/lib/data';
import { Calendar, MapPin, Users, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export default function EventsPage() {
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GroundEvent | null>(null);

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  const handleOpenRSVP = (evt: GroundEvent) => {
    setSelectedEvent(evt);
    setRsvpModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Navbar
        activeSection="events"
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
            Ground Field Drives & Volunteer Shifts
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Upcoming Ground <span className="gradient-text-emerald">Relief Drives</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Reserve your shift slot for food distribution, teaching workshops, tree plantations, or health diagnostic checkups across major cities.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GROUND_EVENTS.map((evt) => {
            const spotsRemaining = evt.volunteersNeeded - evt.volunteersRegistered;
            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white font-extrabold text-xs px-3 py-1 rounded-full">
                    {evt.type}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {evt.date}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">{evt.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>

                    <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                      <p className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.time}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-600" /> {evt.volunteersRegistered}/{evt.volunteersNeeded} Registered
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {spotsRemaining} Spots Left
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenRSVP(evt)}
                      className="w-full py-3 rounded-2xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                    >
                      Reserve Shift Slot <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer
        onNavigate={(sec) => {
          window.location.href = `/#${sec}`;
        }}
        onOpenDonate={() => setDonateModalOpen(true)}
      />

      <EventRSVPModal
        isOpen={rsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
        event={selectedEvent}
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
