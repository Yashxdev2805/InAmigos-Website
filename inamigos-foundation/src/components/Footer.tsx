'use client';

import React from 'react';
import { Heart, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                InAmigos <span className="text-emerald-400">Foundation</span>
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              InAmigos Foundation is a registered Public Charitable Trust dedicated to hunger elimination, girl child education, and environmental restoration across India. All contributions are 80G tax-deductible.
            </p>

            <div className="space-y-1 font-mono text-[11px] text-slate-300">
              <p>Trust Reg No: <span className="text-white font-bold">TRUST/DL/2020/0268</span></p>
              <p>80G Approval: <span className="text-white font-bold">CIT(E)/80G/2021-22/A/10452</span></p>
              <p>NITI Aayog Darpan ID: <span className="text-white font-bold">DL/2020/0268412</span></p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-medium">
              {['home', 'causes', 'transparency', 'volunteer', 'events', 'governance'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onNavigate(link)}
                    className="capitalize hover:text-emerald-400 transition-colors"
                  >
                    {link === 'transparency' ? 'Section 80G & Financials' : link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 font-medium text-slate-300">
              <li className="hover:text-white cursor-pointer">Section 80G Tax Exemption Terms</li>
              <li className="hover:text-white cursor-pointer">Privacy & Data Security Policy</li>
              <li className="hover:text-white cursor-pointer">Audited Financial Statements</li>
              <li className="hover:text-white cursor-pointer">Refund & Cancellation Policy</li>
              <li className="hover:text-white cursor-pointer">Child Protection Policy</li>
            </ul>
          </div>

          {/* Col 4: Contact HQ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact HQ</h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>H-24, Green Park Extension, New Delhi - 110016</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@inamigosfoundation.org.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98100 12345 / 011-4567890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Copyright Footer Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p>&copy; 2026 InAmigos Foundation. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> OWASP Grade A+ Secure
            </span>
            <span>|</span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Award className="w-4 h-4" /> Sec 80G Certified NGO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
