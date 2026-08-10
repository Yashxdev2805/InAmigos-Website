'use client';

import React from 'react';
import { BOARD_MEMBERS } from '@/lib/data';
import { ShieldCheck, UserCheck, Mail, BookOpen } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  return (
    <section id="governance" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Institutional Governance & Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administration & Executive Leadership
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Meet the administration members, trustees, and operational leads governing InAmigos Foundation.
          </p>
        </div>

        {/* Administration Members Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOARD_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs font-extrabold text-emerald-700">{member.role}</p>
                    <p className="text-[11px] text-slate-400 font-mono pt-0.5">{member.qualification}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {member.bio}
                </p>
              </div>

              {member.email && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Contact:</span>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                  >
                    <Mail className="w-3 h-3 text-emerald-600" />
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Monitoring & Evaluation Framework */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-200/60 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">4-Stage Quantitative M&E Framework</h3>
              <p className="text-[11px] text-slate-500">Standardized outcome monitoring and field verification protocol.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Stage 1</span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">Baseline Audit</h4>
              <p className="text-[11px] text-slate-500">Socio-economic survey of slum clusters prior to relief deployment.</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Stage 2</span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">Geotagged Dispatch</h4>
              <p className="text-[11px] text-slate-500">Every ration batch and food van is geotagged upon distribution.</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Stage 3</span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">Beneficiary Audit</h4>
              <p className="text-[11px] text-slate-500">Aadhaar & phone sampling for 20% random beneficiary sample.</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Stage 4</span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">Public Impact Log</h4>
              <p className="text-[11px] text-slate-500">Publishing quarterly audited outcome reports showing cost-per-life-impacted.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
