'use client';

import React from 'react';
import { TRANSPARENCY_DOCS } from '@/lib/data';
import { FileCheck, Download, Award, CheckCircle2, FileText, PieChart } from 'lucide-react';

export const TransparencyHub: React.FC = () => {
  return (
    <section id="transparency" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            100% Financial Accountability
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Financial Transparency & <span className="gradient-text-emerald">Section 80G Compliance</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            InAmigos Foundation operates under a strict zero-corruption governance charter. We publish audited annual financials, Form 10B certificates, and government registration approvals for public inspection.
          </p>
        </div>

        {/* Top Highlight: Fund Utilization Breakdown & Tax Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Fund Utilization Progress Bars */}
          <div className="lg:col-span-7 clean-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold text-slate-900">Fund Allocation Breakdown (FY 2024-25)</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Audited Stats
              </span>
            </div>

            <div className="space-y-4">
              {/* Program Expenses */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">Direct Field Program Execution (Food, Edu, Relief)</span>
                  <span className="text-emerald-700 font-mono">88% (₹88 of every ₹100)</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                  <div className="bg-emerald-600 h-full rounded-full w-[88%]" />
                </div>
              </div>

              {/* Administrative Overhead */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Administrative & Operational Maintenance</span>
                  <span className="text-amber-700 font-mono">8%</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                  <div className="bg-amber-500 h-full rounded-full w-[8%]" />
                </div>
              </div>

              {/* Fundraising */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Fundraising & Awareness Campaigns</span>
                  <span className="text-blue-700 font-mono">4%</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                  <div className="bg-blue-500 h-full rounded-full w-[4%]" />
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-200">
              <span>Independent Auditor: ICAI Chartered Accountants</span>
              <span className="text-emerald-700 font-bold">Form 10B Filed & Verified</span>
            </div>
          </div>

          {/* 80G & 12A Quick Verification Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="clean-card rounded-3xl p-6 border-emerald-200 bg-emerald-50/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Section 80G Tax Exemption</h4>
                  <p className="text-xs text-emerald-700 font-bold">CIT(E) Govt Approval Verified</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-mono bg-white p-4 rounded-2xl border border-slate-200">
                <p>URN: <span className="text-slate-900 font-bold">AAATI4958RE20214</span></p>
                <p>80G Order: <span className="text-slate-900 font-bold">CIT(E)/80G/2021-22/A/10452</span></p>
                <p>NITI Aayog ID: <span className="text-slate-900 font-bold">DL/2020/0268412</span></p>
                <p>Trust Reg: <span className="text-slate-900 font-bold">TRUST/DL/2020/0268</span></p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>50% Income Tax Deduction for All Donors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Documents Repository Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              Download Verified Tax & Audit Documents
            </h3>
            <span className="text-xs text-slate-500">PDF Audit Signed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSPARENCY_DOCS.map((doc) => (
              <div
                key={doc.id}
                className="clean-card clean-card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {doc.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{doc.year}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 pt-1">{doc.title}</h4>
                  <p className="text-xs font-mono text-slate-500">Ref: {doc.refNumber}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">{doc.fileSize}</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading ${doc.title}...`);
                    }}
                    className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
