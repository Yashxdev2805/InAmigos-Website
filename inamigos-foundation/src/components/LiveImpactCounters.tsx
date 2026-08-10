'use client';

import React, { useState, useEffect } from 'react';
import { DYNAMIC_STATS } from '@/lib/data';
import { Utensils, GraduationCap, Users, MapPin } from 'lucide-react';

export const LiveImpactCounters: React.FC = () => {
  const [stats, setStats] = useState({
    meals: 0,
    children: 0,
    volunteers: 0,
    drives: 0,
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        meals: Math.floor(DYNAMIC_STATS.mealsServed * progress),
        children: Math.floor(DYNAMIC_STATS.childrenEducated * progress),
        volunteers: Math.floor(DYNAMIC_STATS.volunteersActive * progress),
        drives: Math.floor(DYNAMIC_STATS.drivesCompleted * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({
          meals: DYNAMIC_STATS.mealsServed,
          children: DYNAMIC_STATS.childrenEducated,
          volunteers: DYNAMIC_STATS.volunteersActive,
          drives: DYNAMIC_STATS.drivesCompleted,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const counterCards = [
    {
      label: 'Hot Meals Served',
      value: stats.meals.toLocaleString('en-IN') + '+',
      icon: Utensils,
      subtext: 'Fresh daily food distribution',
    },
    {
      label: 'Girls Educated',
      value: stats.children.toLocaleString('en-IN') + '+',
      icon: GraduationCap,
      subtext: 'Shiksha Mission sponsorships',
    },
    {
      label: 'Active Volunteers',
      value: stats.volunteers.toLocaleString('en-IN') + '+',
      icon: Users,
      subtext: 'Across 12 major Indian cities',
    },
    {
      label: 'Ground Drives',
      value: stats.drives.toLocaleString('en-IN') + '+',
      icon: MapPin,
      subtext: 'Geotagged relief operations',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Field Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time metrics aggregated directly from database-verified drive logs.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {counterCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                    {card.value}
                  </h3>
                  <p className="text-xs font-extrabold text-slate-800">{card.label}</p>
                  <p className="text-[11px] text-slate-400">{card.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
