'use client';

import React, { useState } from 'react';
import { CAUSES_DATA, Cause } from '@/lib/data';
import { Heart, MapPin, CheckCircle2 } from 'lucide-react';

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
    <section id="causes" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Active Relief Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Sponsor meals, education kits, or medical hygiene checkup drives directly with instant 80G tax receipts.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCauses.map((cause) => {
            const progressPercent = Math.min(
              100,
              Math.round((cause.raisedAmount / cause.targetAmount) * 100)
            );

            return (
              <div
                key={cause.id}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Cause Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-900 shadow-xs">
                      {cause.category}
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white bg-slate-900/75 px-2.5 py-1 rounded-md backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {cause.location}
                    </div>
                  </div>

                  {/* Cause Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {cause.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {cause.shortDesc}
                    </p>

                    {/* Impact Ratio Pill */}
                    <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Tangible Impact:</span>
                      <strong className="text-emerald-800 font-extrabold">
                        {cause.impactRatio}
                      </strong>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Raised: <strong className="text-emerald-700">₹{cause.raisedAmount.toLocaleString('en-IN')}</strong></span>
                        <span className="text-slate-400">Goal: ₹{cause.targetAmount.toLocaleString('en-IN')} ({progressPercent}%)</span>
                      </div>

                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectCause(cause)}
                    className="w-full py-3 rounded-xl font-extrabold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    Sponsor This Cause
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
