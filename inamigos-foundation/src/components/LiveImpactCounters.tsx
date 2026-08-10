'use client';

import React, { useState, useEffect } from 'react';
import { DYNAMIC_STATS } from '@/lib/data';
import { Utensils, GraduationCap, Users, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';

export const LiveImpactCounters: React.FC = () => {
  const [stats, setStats] = useState({
    meals: 0,
    children: 0,
    volunteers: 0,
    drives: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
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
      label: 'Hot Cooked Meals Served',
      value: stats.meals.toLocaleString('en-IN') + '+',
      icon: Utensils,
      color: 'bg-emerald-100 text-emerald-700',
      borderColor: 'border-emerald-200',
      subtext: 'Freshly served across slum clusters',
    },
    {
      label: 'Girls Under Shiksha Mission',
      value: stats.children.toLocaleString('en-IN') + '+',
      icon: GraduationCap,
      color: 'bg-amber-100 text-amber-700',
      borderColor: 'border-amber-200',
      subtext: 'Tuition, books & digital tools',
    },
    {
      label: 'Active Youth Volunteers',
      value: stats.volunteers.toLocaleString('en-IN') + '+',
      icon: Users,
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200',
      subtext: 'Across 12 major Indian cities',
    },
    {
      label: 'Ground Relief Drives Conducted',
      value: stats.drives.toLocaleString('en-IN') + '+',
      icon: MapPin,
      color: 'bg-purple-100 text-purple-700',
      borderColor: 'border-purple-200',
      subtext: 'Geotagged & photo verified',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <TrendingUp className="w-3.5 h-3.5" />
            Verified Field Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Numbers, Real Change On The Ground
          </h2>
          <p className="text-sm text-slate-600">
            Our live impact metrics are aggregated directly from database-verified drive log receipts.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {counterCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`clean-card clean-card-hover p-6 rounded-3xl ${card.borderColor} space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                    {card.value}
                  </h3>
                  <p className="text-sm font-bold text-slate-800">{card.label}</p>
                  <p className="text-xs text-slate-500 pt-1">{card.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
