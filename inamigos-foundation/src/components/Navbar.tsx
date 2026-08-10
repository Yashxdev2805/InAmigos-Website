'use client';

import React, { useState } from 'react';
import { Heart, Menu, X, Award, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'causes', label: 'Causes' },
    { id: 'transparency', label: '80G & Financials' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'events', label: 'Drives' },
    { id: 'governance', label: 'Governance' },
    { id: 'admin', label: 'Admin Portal' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Slim Announcement Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              100% Tax Deductible under Section 80G
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              Trust Reg: <strong className="text-white">TRUST/DL/2020/0268</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Grade A+ Security Verified
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight font-sans block">
              InAmigos <span className="text-emerald-600">Foundation</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Registered NGO Trust
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenVolunteer}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Join Volunteer
          </button>
          <button
            onClick={onOpenDonate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4 fill-white" />
            Donate Now (80G)
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeSection === link.id
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenVolunteer(); setMobileMenuOpen(false); }}
              className="py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100"
            >
              Volunteer
            </button>
            <button
              onClick={() => { onOpenDonate(); setMobileMenuOpen(false); }}
              className="py-3 rounded-xl text-xs font-extrabold text-white bg-emerald-600"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
