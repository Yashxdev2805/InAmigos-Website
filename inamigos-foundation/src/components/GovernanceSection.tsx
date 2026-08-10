'use client';

import React from 'react';
import { BOARD_MEMBERS } from '@/lib/data';
import { ShieldCheck, UserCheck, BookOpen } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  return (
    <section id="governance" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Institutional Governance & M&E Framework
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Independent Board Oversight & <span className="gradient-text-emerald">Monitoring Framework</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            InAmigos Foundation is governed by an independent Board of Trustees and guided by a quantitative Monitoring & Evaluation (M&E) outcome tracking protocol.
          </p>
        </div>

        {/* Board of Directors Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              Board of Trustees & Executive Leadership
            </h3>
            <span className="text-xs text-slate-500 font-medium">Conflict-Free Governance Board</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BOARD_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="clean-card clean-card-hover rounded-3xl p-6 space-y-4 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-600 p-1 shadow-sm"
                />
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">{member.name}</h4>
                  <p className="text-xs font-bold text-emerald-700">{member.role}</p>
                  <p className="text-[11px] text-slate-500 font-mono pt-0.5">{member.qualification}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring & Evaluation (M&E) Framework Summary */}
        <div className="clean-card rounded-3xl p-8 space-y-6 border-slate-200">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Monitoring & Evaluation (M&E) Impact Standard</h3>
              <p className="text-xs text-blue-700 font-bold">4-Stage Quantitative Outcome Protocol</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-800">1</span>
                Baseline Audit
              </div>
              <p className="text-xs text-slate-600">Ground socio-economic survey of target slum cluster prior to relief drive deployment.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-800">2</span>
                Geotagged Dispatch
              </div>
              <p className="text-xs text-slate-600">Every relief truck and food ration batch is geotagged and timestamped upon distribution.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-800">3</span>
                Beneficiary Verification
              </div>
              <p className="text-xs text-slate-600">Aadhaar/Identity phone confirmation sampling for 20% random beneficiary sample.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-800">4</span>
                Donor ROI Reporting
              </div>
              <p className="text-xs text-slate-600">Publishing quarterly outcome reports showing cost-per-life-impacted metrics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
