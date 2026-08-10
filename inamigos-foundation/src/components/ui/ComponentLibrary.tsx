'use client';

import React from 'react';
import { Heart, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

// Accessible Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
    outline: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300',
    amber: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-xl font-bold',
    md: 'px-5 py-2.5 text-xs font-extrabold rounded-xl',
    lg: 'px-7 py-3.5 text-sm font-extrabold rounded-2xl',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  );
};

// Accessible Badge Component
export const Badge: React.FC<{ children: React.ReactNode; variant?: 'emerald' | 'amber' | 'blue' | 'red' }> = ({
  children,
  variant = 'emerald',
}) => {
  const styles = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    red: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${styles[variant]}`}>
      {children}
    </span>
  );
};

// Accessible Progress Bar Component
export const ProgressBar: React.FC<{ value: number; max?: number; label?: string }> = ({
  value,
  max = 100,
  label = 'Funding progress',
}) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="space-y-1" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300">
        <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

// Accessible Alert Component
export const Alert: React.FC<{ title: string; children: React.ReactNode; type?: 'info' | 'success' | 'warning' }> = ({
  title,
  children,
  type = 'info',
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900 icon:text-blue-600',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900 icon:text-emerald-600',
    warning: 'bg-amber-50 border-amber-200 text-amber-900 icon:text-amber-600',
  };

  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${styles[type]}`} role="alert">
      <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-extrabold text-sm">{title}</p>
        <p className="mt-0.5 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};
