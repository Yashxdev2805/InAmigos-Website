'use client';

import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock, Users } from 'lucide-react';
import { GroundEvent } from '@/lib/data';

interface EventRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: GroundEvent | null;
}

export const EventRSVPModal: React.FC<EventRSVPModalProps> = ({ isOpen, onClose, event }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [role, setRole] = useState('Field Distribution');

  if (!isOpen || !event) return null;

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerPhone) return;
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-700 overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {confirmed ? 'RSVP Confirmed!' : 'Drive Volunteer RSVP'}
              </h3>
              <p className="text-xs text-purple-400 font-medium truncate max-w-[260px]">
                {event.title}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmitRSVP} className="p-6 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{event.location}, {event.city}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Das"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-sm text-white outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-sm text-white outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">On-Ground Shift Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 px-3.5 text-sm text-white outline-none mt-1"
                >
                  <option value="Field Distribution">Field Meal & Kit Distribution</option>
                  <option value="Crowd & Logistics">Crowd Management & Logistics</option>
                  <option value="Media & Photography">Media, Photography & Video</option>
                  <option value="Team Leader">Assistant Drive Leader</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 hover:from-purple-300 hover:to-pink-300 transition-all shadow-xl shadow-purple-500/20"
            >
              Confirm Ground Drive Shift RSVP
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">See You On Ground, {volunteerName}!</h4>
              <p className="text-xs text-slate-300">
                You are registered for <strong>{event.title}</strong> as <strong>{role}</strong>.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-left space-y-1.5 font-mono">
              <p className="text-slate-400">Date: <span className="text-white">{event.date}</span></p>
              <p className="text-slate-400">Timing: <span className="text-white">{event.time}</span></p>
              <p className="text-slate-400">Venue: <span className="text-white">{event.location}</span></p>
              <p className="text-slate-400">Contact Shift Manager: <span className="text-emerald-400">+91 98100 12345</span></p>
            </div>

            <p className="text-[11px] text-slate-400">
              A location pin and reminder SMS have been sent to {volunteerPhone}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
