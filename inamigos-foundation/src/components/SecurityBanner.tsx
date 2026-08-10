'use client';

import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Server, Key, FileCheck } from 'lucide-react';

export const SecurityBanner: React.FC = () => {
  const securityChecks = [
    { label: 'Cloudflare WAF', status: 'Active' },
    { label: 'HSTS Encryption', status: 'Enforced' },
    { label: 'Cryptographic CSP', status: 'Protected' },
    { label: 'Anti-Clickjacking', status: 'SAMEORIGIN' },
    { label: 'Database Isolation', status: 'Port 3306 Closed' },
    { label: 'Sec 80G Approval', status: 'CIT(E) Verified' },
  ];

  return (
    <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold text-slate-800">Security Perimeter:</span>
          <span className="text-slate-600">OWASP ZAP & Nmap Audited (Grade A+)</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {securityChecks.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-slate-700">{item.label}:</span>
              <span className="font-bold text-emerald-700">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
