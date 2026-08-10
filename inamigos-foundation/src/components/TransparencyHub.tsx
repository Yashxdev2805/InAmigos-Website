'use client';

import React from 'react';
import { TRANSPARENCY_DOCS } from '@/lib/data';
import { FileCheck, Download, Award, CheckCircle2, FileText } from 'lucide-react';

export const TransparencyHub: React.FC = () => {
  return (
    <section id="transparency" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Financial Transparency & 80G Compliance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Published audited annual financials, Form 10B certificates, and statutory government registrations for public inspection.
          </p>
        </div>

        {/* Top Highlight: Fund Utilization Breakdown & Tax Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Fund Utilization Progress Bars */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">Fund Allocation Breakdown (FY 2024-25)</h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Audited Stats
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Program Expenses */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">Direct Field Program Execution (Food, Edu, Relief)</span>
                  <span className="text-emerald-700 font-bold font-mono">88%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-emerald-600 h-full rounded-full w-[88%]" />
                </div>
              </div>

              {/* Administrative Overhead */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Administrative Maintenance</span>
                  <span className="text-amber-700 font-bold font-mono">8%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-amber-500 h-full rounded-full w-[8%]" />
                </div>
              </div>

              {/* Fundraising */}
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Fundraising & Awareness</span>
                  <span className="text-blue-700 font-bold font-mono">4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-blue-500 h-full rounded-full w-[4%]" />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
              <span>Independent Auditor: ICAI Chartered Accountants</span>
              <span className="text-emerald-700 font-semibold">Form 10B Filed</span>
            </div>
          </div>

          {/* 80G & 12A Quick Verification Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Section 80G Tax Exemption</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">CIT(E) Govt Approval Verified</p>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p>URN: <span className="text-slate-900 font-bold">AAATI4958RE20214</span></p>
                <p>80G Order: <span className="text-slate-900 font-bold">CIT(E)/80G/2021-22/A/10452</span></p>
                <p>NITI Aayog ID: <span className="text-slate-900 font-bold">DL/2020/0268412</span></p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>50% Income Tax Deduction Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Documents Repository Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Verified Tax & Audit PDF Documents
            </h3>
            <span className="text-xs text-slate-400">PDF Signed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRANSPARENCY_DOCS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {doc.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{doc.year}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 pt-1">{doc.title}</h4>
                  <p className="text-[11px] font-mono text-slate-400">Ref: {doc.refNumber}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">{doc.fileSize}</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading ${doc.title}...`);
                    }}
                    className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
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
