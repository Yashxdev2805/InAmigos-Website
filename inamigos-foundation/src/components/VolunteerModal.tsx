'use client';

import React, { useState } from 'react';
import { X, Users, CheckCircle2, MessageSquare, Download, Sparkles, MapPin, Clock } from 'lucide-react';
import { VOLUNTEER_ROLES } from '@/lib/data';
import { generateVolunteerCertificatePDF } from '@/lib/pdf-receipt';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [selectedRoleId, setSelectedRoleId] = useState(VOLUNTEER_ROLES[0].id);
  const [availability, setAvailability] = useState('Weekends (Sat/Sun)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitted(true);
  };

  const handleDownloadSampleCertificate = () => {
    const roleTitle = VOLUNTEER_ROLES.find((r) => r.id === selectedRoleId)?.title || 'Volunteer Team Lead';
    generateVolunteerCertificatePDF(name || 'Volunteer Hero', roleTitle, 25);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-teal-500/30 overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {submitted ? 'Application Submitted!' : 'Sub-3-Min Volunteer Micro-App'}
              </h3>
              <p className="text-xs text-teal-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Join 1,850+ Active Youth Volunteers
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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 outline-none mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">City / Location</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl py-2.5 px-3.5 text-sm text-white outline-none mt-1"
                  >
                    <option value="New Delhi">New Delhi (NCR)</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Remote">Remote / Online</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-xl py-2.5 px-3.5 text-sm text-white outline-none mt-1"
                  >
                    <option value="Weekends (Sat/Sun)">Weekends (Sat/Sun)</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible / Remote">Flexible / Remote</option>
                  </select>
                </div>
              </div>

              {/* Preferred Role Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Select Preferred Role:</label>
                <div className="space-y-2">
                  {VOLUNTEER_ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedRoleId === role.id
                          ? 'bg-teal-950/60 border-teal-500/60 shadow-md'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{role.title}</h4>
                        <span className="text-[10px] font-semibold text-teal-400 bg-teal-900/60 px-2 py-0.5 rounded-full border border-teal-500/30">
                          {role.type} | {role.commitment}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-xl shadow-teal-500/20"
            >
              Submit Volunteer Application (Instant Confirmation)
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Welcome to the Team, {name}!</h4>
              <p className="text-xs text-slate-300">
                Your application has been processed. You have been assigned a <strong>Volunteer Buddy</strong> for your first drive in {city}.
              </p>
            </div>

            {/* Simulated Onboarding Actions */}
            <div className="space-y-3 pt-2">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-green-600 hover:bg-green-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                Join InAmigos {city} WhatsApp Volunteers Group
              </a>

              <button
                onClick={handleDownloadSampleCertificate}
                className="w-full py-3 rounded-2xl text-xs font-extrabold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-teal-400" />
                Download Sample Experience Certificate (PDF)
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-2">
              An orientation email with the 48-Hour Welcome Kit has been dispatched to <strong>{email}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
