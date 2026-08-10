'use client';

import React, { useState } from 'react';
import { Heart, Menu, X, ShieldCheck } from 'lucide-react';

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
    { id: 'transparency', label: 'Financials & 80G' },
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 tracking-tight font-sans block">
              InAmigos <span className="text-emerald-600">Foundation</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Registered NGO Trust
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-emerald-600 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
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
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Join Volunteer
          </button>
          <button
            onClick={onOpenDonate}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            Donate (80G)
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeSection === link.id
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenVolunteer(); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100"
            >
              Volunteer
            </button>
            <button
              onClick={() => { onOpenDonate(); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-xs font-extrabold text-white bg-emerald-600"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
