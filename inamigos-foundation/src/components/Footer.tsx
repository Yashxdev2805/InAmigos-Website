'use client';

import React from 'react';
import { Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                InAmigos <span className="text-emerald-400">Foundation</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              Section 80G tax-exempt registered Public Charitable Trust in India dedicated to hunger relief, child education, and community healthcare.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 font-medium text-[11px]">
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

          {/* Col 3: Legal & Registration */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Statutory Credentials</h4>
            <div className="space-y-1 font-mono text-[11px] text-slate-400">
              <p>Trust Reg: <span className="text-white">TRUST/DL/2020/0268</span></p>
              <p>Section 80G: <span className="text-white">CIT(E)/80G/2021-22/A/10452</span></p>
              <p>NITI Aayog: <span className="text-white">DL/2020/0268412</span></p>
            </div>
          </div>

          {/* Col 4: Contact HQ */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact HQ</h4>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>H-24, Green Park Extension, New Delhi - 110016</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>contact@inamigosfoundation.org.in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 98100 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Copyright Footer Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>&copy; 2026 InAmigos Foundation. All Rights Reserved.</p>

          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Grade A+ Security & 80G Tax Certified NGO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
