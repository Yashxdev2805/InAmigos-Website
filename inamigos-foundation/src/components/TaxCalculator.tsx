'use client';

import React, { useState } from 'react';
import { Calculator, Award, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TaxCalculatorProps {
  onOpenDonateWithAmount: (amount: number) => void;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onOpenDonateWithAmount }) => {
  const [donationAmount, setDonationAmount] = useState<number>(5000);
  const [taxBracket, setTaxBracket] = useState<number>(30);

  const deductibleAmount = donationAmount * 0.5;
  const rawTaxSaved = deductibleAmount * (taxBracket / 100);
  const totalTaxSaved = Math.round(rawTaxSaved * 1.04);
  const netEffectiveCost = donationAmount - totalTaxSaved;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Context */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
            <Award className="w-4 h-4 text-amber-600" />
            Official Tax Savings Calculator (Sec 80G)
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Save Up To <span className="gradient-text-gold">50% In Income Tax</span> On Every Contribution
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Under Section 80G of the Indian Income Tax Act 1961, 50% of your donation to InAmigos Foundation is directly deductible from your taxable income. We issue an instant, audit-stamped 80G tax receipt PDF with PAN verification.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Instant PDF Receipt:</strong> Delivered automatically to your email with Form 10BE compliance data.</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Valid for Salaried & Business Taxpayers:</strong> Applicable under the Old Tax Regime for FY 2025-26.</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>CIT(E) Govt Approved:</strong> URN: AAATI4958RE20214.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculator Box */}
        <div className="lg:col-span-6">
          <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">80G Tax Savings Calculator</h3>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                FY 2025-26
              </span>
            </div>

            {/* Slider 1: Donation Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-700">Your Contribution:</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  INR ₹{donationAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>₹500</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Selector 2: Income Tax Slab */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Your Tax Bracket:</label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map((slab) => (
                  <button
                    key={slab}
                    onClick={() => setTaxBracket(slab)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      taxBracket === slab
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slab}% Slab
                  </button>
                ))}
              </div>
            </div>

            {/* Tax Output Summary Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-bold text-emerald-800">Estimated Tax Saved</p>
                <p className="text-3xl font-black text-emerald-700 font-mono">
                  ₹{totalTaxSaved.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-emerald-700">(Includes 4% Health & Ed Cess)</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-bold text-slate-700">Net Out-Of-Pocket Cost</p>
                <p className="text-3xl font-black text-slate-900 font-mono">
                  ₹{netEffectiveCost.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-500">Effective impact value</p>
              </div>
            </div>

            {/* CTA Trigger */}
            <button
              onClick={() => onOpenDonateWithAmount(donationAmount)}
              className="w-full py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              Donate ₹{donationAmount.toLocaleString('en-IN')} & Save ₹{totalTaxSaved.toLocaleString('en-IN')} Tax
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
