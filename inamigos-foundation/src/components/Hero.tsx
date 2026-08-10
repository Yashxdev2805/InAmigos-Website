'use client';

import React from 'react';
import { Heart, Users, ShieldCheck, ArrowRight, Sparkles, Award, CheckCircle2 } from 'lucide-react';

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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>100% Tax Deductible under Section 80G</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Transforming Lives Through <span className="gradient-text-emerald">Direct Field Action</span> & Transparent Giving
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            InAmigos Foundation brings cooked meals, girl child education, and environmental restoration to vulnerable communities across India. Every rupee is audit-verified, 80G tax-exempt, and backed by live geotagged field impact metrics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onOpenDonate}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-5 h-5 fill-white" />
              Sponsor Meals & Education
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenVolunteer}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-all shadow-sm"
            >
              <Users className="w-5 h-5 text-emerald-600" />
              Join as a Volunteer
            </button>
          </div>

          {/* Key Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant 80G Tax Receipt PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>88% Direct Program Allocation</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-emerald-700 font-bold hover:underline" onClick={onNavigateTransparency}>
              <span>View Audited FY25 Financials &rarr;</span>
            </div>
          </div>
        </div>

        {/* Right Column: Imagery Card */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-3xl overflow-hidden clean-card p-3 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
                alt="InAmigos Food Distribution Drive"
                className="w-full h-[380px] object-cover rounded-2xl"
              />

              {/* Floating Badge 1 */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                  <Heart className="w-5 h-5 fill-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Daily Relief Impact</p>
                  <p className="text-base font-black text-slate-900">2,500+ Meals Served / Day</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Verified Compliance</p>
                  <p className="text-xs font-extrabold text-amber-700">80G & 12A Certified NGO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
