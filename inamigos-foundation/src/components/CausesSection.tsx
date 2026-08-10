'use client';

import React, { useState } from 'react';
import { CAUSES_DATA, Cause } from '@/lib/data';
import { Heart, MapPin, Target, Sparkles, CheckCircle2 } from 'lucide-react';

interface CausesProps {
  onSelectCause: (cause: Cause) => void;
}

export const CausesSection: React.FC<CausesProps> = ({ onSelectCause }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Food', 'Education', 'Healthcare', 'Environment'];

  const filteredCauses = selectedCategory === 'All'
    ? CAUSES_DATA
    : CAUSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="causes" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Direct Impact Causes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sponsor A Cause With <span className="gradient-text-emerald">Tangible Outcome</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Every cause comes with a transparent metric ask. You can sponsor meals, educational kits, or saplings directly with instant 80G receipts.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCauses.map((cause) => {
            const progressPercent = Math.min(
              100,
              Math.round((cause.raisedAmount / cause.targetAmount) * 100)
            );

            return (
              <div
                key={cause.id}
                className="clean-card clean-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cause Image & Urgency Badge */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 text-slate-900 shadow-sm backdrop-blur-md">
                        {cause.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold backdrop-blur-md ${
                          cause.urgency === 'Critical'
                            ? 'bg-red-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                        }`}
                      >
                        {cause.urgency} Need
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white bg-slate-900/80 px-3 py-1 rounded-lg backdrop-blur-md">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {cause.location}
                    </div>
                  </div>

                  {/* Cause Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cause.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {cause.shortDesc}
                    </p>

                    {/* Metric-Tied Impact Badge */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-slate-800">Tangible Impact:</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200 shadow-sm">
                        {cause.impactRatio}
                      </span>
                    </div>

                    {/* Funding Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">
                          Raised: <strong className="text-emerald-700">₹{cause.raisedAmount.toLocaleString('en-IN')}</strong>
                        </span>
                        <span className="text-slate-500">
                          Goal: ₹{cause.targetAmount.toLocaleString('en-IN')} ({progressPercent}%)
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>{cause.donorCount} Generous Donors</span>
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 80G Tax Deductible
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectCause(cause)}
                    className="w-full py-3.5 rounded-2xl font-extrabold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Sponsor This Cause Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
