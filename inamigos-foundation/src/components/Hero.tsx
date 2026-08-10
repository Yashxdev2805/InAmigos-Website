'use client';

import React from 'react';
import { Heart, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onNavigateTransparency: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onNavigateTransparency,
}) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Tax Deductible under Section 80G</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Direct Field Action. <br className="hidden sm:inline" />
            <span className="text-emerald-600">Transparent Relief.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            InAmigos Foundation delivers fresh cooked meals, girl child education kits, and healthcare drives across India. Every donation is audit-verified with instant 80G tax receipts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={onOpenDonate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <Heart className="w-4 h-4 fill-white" />
              Sponsor Meals & Education
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVolunteer}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              Join as Volunteer
            </button>
          </div>

          {/* Key Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant 80G Tax PDF Receipt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>88% Program Capital Allocation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Field Photo */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 p-2">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                alt="InAmigos Food Distribution Drive"
                className="w-full h-[360px] object-cover rounded-xl"
              />
              <div className="p-3 bg-white rounded-xl mt-2 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">Daily Relief Action</p>
                  <p className="text-slate-500 text-[11px]">2,500+ Nutritious Meals Served Daily</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                  Section 80G NGO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
