'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, Database, Download, AlertTriangle } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'inamigos2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin credentials. Please enter demo security key: admin123');
    }
  };

  const sampleDonations = [
    { id: 'DON-9821', donor: 'Vikramaditya Sharma', amount: '₹10,000', pan: 'ABCDE1234F', date: '2026-08-09', cause: 'Hunger Relief', status: '80G Issued' },
    { id: 'DON-9822', donor: 'Ananya Roy', amount: '₹2,500', pan: 'FGHIJ5678K', date: '2026-08-08', cause: 'Shiksha Mission', status: '80G Issued' },
    { id: 'DON-9823', donor: 'Siddharth Nair', amount: '₹5,000', pan: 'LMNOP9012Q', date: '2026-08-08', cause: 'Community Health', status: '80G Issued' },
  ];

  return (
    <section id="admin" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 text-xs font-bold text-slate-800">
            <Lock className="w-4 h-4 text-slate-700" />
            Role-Based Access Control (RBAC) Admin CRM
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Administrator & <span className="gradient-text-emerald">Donor Control Center</span>
          </h2>
          <p className="text-sm text-slate-600">
            Secure admin portal for viewing donor CRM ledgers, issuing tax receipts, reviewing volunteer applications, and managing cause targets.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto clean-card p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Admin Authentication</h3>
              <p className="text-xs text-slate-500">Enter Admin Key to Access CRM Ledger</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Password (Demo: admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl py-3 px-4 text-sm text-slate-900 outline-none"
                />
              </div>

              {error && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md"
              >
                Authenticate Admin Session
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Super Admin Session Active</h3>
                  <p className="text-xs text-emerald-700 font-bold">Role: Executive Finance Manager | IP Logged</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
              >
                Lock Session
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="clean-card p-6 rounded-2xl space-y-1">
                <p className="text-xs text-slate-500 font-bold">Total FY26 Donations Raised</p>
                <p className="text-3xl font-black text-emerald-700 font-mono">₹40,10,000</p>
                <p className="text-xs text-slate-500">3,540 Unique Donors</p>
              </div>

              <div className="clean-card p-6 rounded-2xl space-y-1">
                <p className="text-xs text-slate-500 font-bold">Pending Volunteer Apps</p>
                <p className="text-3xl font-black text-amber-600 font-mono">14 Unassigned</p>
                <p className="text-xs text-slate-500">Delhi & Mumbai Hubs</p>
              </div>

              <div className="clean-card p-6 rounded-2xl space-y-1">
                <p className="text-xs text-slate-500 font-bold">System Audit Health</p>
                <p className="text-3xl font-black text-blue-700 font-mono">100% Clean</p>
                <p className="text-xs text-slate-500">Zero Security Flags</p>
              </div>
            </div>

            <div className="clean-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-700" />
                  Recent Donor CRM Ledger & 80G Receipts
                </h4>
                <button
                  onClick={() => alert('Exporting CRM Ledger to CSV...')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" /> Export CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-mono uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">PAN No</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Cause</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-slate-700">
                    {sampleDonations.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="p-3 text-emerald-700 font-bold">{row.id}</td>
                        <td className="p-3 font-sans text-slate-900 font-bold">{row.donor}</td>
                        <td className="p-3">{row.pan}</td>
                        <td className="p-3 font-bold text-slate-900">{row.amount}</td>
                        <td className="p-3 font-sans">{row.cause}</td>
                        <td className="p-3">{row.date}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
