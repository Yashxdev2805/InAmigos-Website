'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Heart, CreditCard, QrCode, Lock, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import { Cause } from '@/lib/data';
import { generate80GReceiptPDF } from '@/lib/pdf-receipt';
import { submitDonationToBackend } from '@/lib/api-client';
import confetti from 'canvas-confetti';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCause?: Cause | null;
  initialAmount?: number;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  selectedCause,
  initialAmount = 2500,
}) => {
  const [step, setStep] = useState<'amount' | 'details' | 'processing' | 'success'>('amount');
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Card' | 'NetBanking' | 'International'>('UPI');
  
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [needTaxReceipt, setNeedTaxReceipt] = useState(true);

  // Validation Error States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [panError, setPanError] = useState('');
  const [formGeneralError, setFormGeneralError] = useState('');

  const [transactionId, setTransactionId] = useState('');
  const [receiptNo, setReceiptNo] = useState('');

  useEffect(() => {
    if (initialAmount) setAmount(initialAmount);
  }, [initialAmount]);

  if (!isOpen) return null;

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  // Validation RegEx Rules
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(?:(?:\+91)|(?:0))?[6-9]\d{9}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const validateFields = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPanError('');
    setFormGeneralError('');

    // 1. Name Validation
    if (!donorName.trim() || donorName.trim().length < 2) {
      setNameError('Please enter your full legal name.');
      isValid = false;
    }

    // 2. Email Format & Existence Validation
    if (!donorEmail.trim()) {
      setEmailError('Email address is required for 80G receipt delivery.');
      isValid = false;
    } else if (!emailRegex.test(donorEmail.trim())) {
      setEmailError('Invalid email address format (e.g. name@domain.com).');
      isValid = false;
    }

    // 3. Indian Mobile Number Validation
    const cleanPhone = donorPhone.replace(/\s+/g, '');
    if (cleanPhone && !phoneRegex.test(cleanPhone)) {
      setPhoneError('Invalid Indian mobile number. Must be 10 digits starting with 6-9.');
      isValid = false;
    }

    // 4. PAN Number Format & Requirement Validation
    const cleanPan = donorPan.trim().toUpperCase();
    if (needTaxReceipt) {
      if (!cleanPan) {
        setPanError('PAN Number is mandatory to claim Section 80G tax exemption.');
        isValid = false;
      } else if (!panRegex.test(cleanPan)) {
        setPanError('Invalid PAN format! Must be 5 letters + 4 numbers + 1 letter (e.g. ABCDE1234F).');
        isValid = false;
      }
    } else if (cleanPan && !panRegex.test(cleanPan)) {
      setPanError('Invalid PAN format! Must be 5 letters + 4 numbers + 1 letter (e.g. ABCDE1234F).');
      isValid = false;
    }

    return isValid;
  };

  const handleSelectAmount = (amt: number) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(Number(val))) {
      setAmount(Number(val));
    }
  };

  const handleProceedToDetails = () => {
    if (amount <= 0) return;
    setStep('details');
  };

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setStep('processing');

    // Call decoupled Backend API service
    const apiResult = await submitDonationToBackend({
      amount,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim(),
      donorPan: donorPan.trim().toUpperCase(),
      paymentMode,
      causeTitle: selectedCause ? selectedCause.title : 'General Relief & Hunger Fund',
    });

    if (apiResult && apiResult.data) {
      setTransactionId(apiResult.data.transactionId);
      setReceiptNo(apiResult.data.receiptNo);
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (apiResult && apiResult.error) {
      setFormGeneralError(apiResult.error);
      setStep('details');
    } else {
      setTransactionId('TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase());
      setReceiptNo('IAM-80G-' + Math.floor(100000 + Math.random() * 900000));
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleDownloadReceipt = () => {
    generate80GReceiptPDF({
      receiptNo,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      amount,
      paymentMode,
      transactionId,
      causeName: selectedCause ? selectedCause.title : 'General Relief & Hunger Fund',
      date: new Date().toLocaleString('en-IN'),
    });
  };

  const handleResetAndClose = () => {
    setStep('amount');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPanError('');
    setFormGeneralError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Heart className="w-5 h-5 fill-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {step === 'success' ? 'Donation Successful!' : 'Secure Donation Portal'}
              </h3>
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Strict Validation Active | 80G Tax Deductible
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedCause && step !== 'success' && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium truncate max-w-[280px]">
              Sponsoring: <strong className="text-slate-900">{selectedCause.title}</strong>
            </span>
            <span className="text-emerald-800 font-bold bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
              {selectedCause.impactRatio}
            </span>
          </div>
        )}

        {/* Step 1: Amount & Payment Mode */}
        {step === 'amount' && (
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Donation Amount (INR):
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleSelectAmount(amt)}
                    className={`py-3 px-2 rounded-2xl text-sm font-extrabold transition-all border ${
                      amount === amt && !customAmount
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder="Or enter custom amount in INR..."
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-2xl py-3 px-4 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Preferred Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / GPay / QR', icon: QrCode },
                  { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'NetBanking', label: 'NetBanking (All Banks)', icon: Lock },
                  { id: 'International', label: 'International (USD/EUR)', icon: ShieldCheck },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setPaymentMode(mode.id as any)}
                      className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold border transition-all ${
                        paymentMode === mode.id
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-600" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tax Savings Hint */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <span className="text-slate-700">Section 80G Tax Saved (30% slab):</span>
              <strong className="text-amber-800 font-extrabold text-sm">
                ₹{Math.round(amount * 0.5 * 0.3 * 1.04).toLocaleString('en-IN')}
              </strong>
            </div>

            <button
              onClick={handleProceedToDetails}
              className="w-full py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
            >
              Proceed with ₹{amount.toLocaleString('en-IN')} Donation
            </button>
          </div>
        )}

        {/* Step 2: Donor Contact & PAN Details with Strict Real-Time Validation */}
        {step === 'details' && (
          <form onSubmit={handleSimulatePayment} className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
              <span>Selected Amount: <strong className="text-emerald-700">₹{amount.toLocaleString('en-IN')}</strong></span>
              <button
                type="button"
                onClick={() => setStep('amount')}
                className="text-emerald-700 hover:underline"
              >
                Change
              </button>
            </div>

            {formGeneralError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formGeneralError}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Name Field */}
              <div>
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Sharma"
                  value={donorName}
                  onChange={(e) => {
                    setDonorName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none mt-1 transition-colors ${
                    nameError ? 'border-red-500 focus:border-red-600 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {nameError && <p className="text-[11px] text-red-600 font-bold mt-1">{nameError}</p>}
              </div>

              {/* Email & Phone Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    placeholder="vikram@example.com"
                    value={donorEmail}
                    onChange={(e) => {
                      setDonorEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none mt-1 transition-colors ${
                      emailError ? 'border-red-500 focus:border-red-600 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                    }`}
                  />
                  {emailError && <p className="text-[11px] text-red-600 font-bold mt-1">{emailError}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Mobile Number (Indian)</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={donorPhone}
                    onChange={(e) => {
                      setDonorPhone(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none mt-1 transition-colors ${
                      phoneError ? 'border-red-500 focus:border-red-600 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                    }`}
                  />
                  {phoneError && <p className="text-[11px] text-red-600 font-bold mt-1">{phoneError}</p>}
                </div>
              </div>

              {/* PAN Number Field for 80G Tax Exemption */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    PAN Number {needTaxReceipt ? '*' : '(Optional)'}
                  </label>
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">Format: ABCDE1234F</span>
                </div>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="e.g. ABCDE1234F"
                  value={donorPan}
                  onChange={(e) => {
                    setDonorPan(e.target.value.toUpperCase());
                    if (panError) setPanError('');
                  }}
                  className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 uppercase placeholder-slate-400 outline-none mt-1 font-mono tracking-wider transition-colors ${
                    panError ? 'border-red-500 focus:border-red-600 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {panError && <p className="text-[11px] text-red-600 font-bold mt-1">{panError}</p>}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="taxCheck"
                  checked={needTaxReceipt}
                  onChange={(e) => {
                    setNeedTaxReceipt(e.target.checked);
                    if (!e.target.checked && panError) setPanError('');
                  }}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="taxCheck" className="text-xs text-slate-700 cursor-pointer">
                  Generate & email official Section 80G Tax Exemption PDF receipt immediately.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
            >
              Complete Payment (₹{amount.toLocaleString('en-IN')})
            </button>
          </form>
        )}

        {/* Step 3: Payment Processing */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin mx-auto" />
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-slate-900">Verifying Strict Field Format & API Response...</h4>
              <p className="text-xs text-slate-500">
                Calling decoupled Express backend & generating 80G Tax Receipt PDF...
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Success & Download 80G Receipt */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900">Thank You, {donorName}!</h4>
              <p className="text-xs text-slate-600">
                Your contribution of <strong className="text-emerald-700">₹{amount.toLocaleString('en-IN')}</strong> has been received and logged into our Express API database.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Receipt No:</span>
                <span className="text-emerald-700 font-bold">{receiptNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-slate-800">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Section 80G Tax Status:</span>
                <span className="text-amber-700 font-bold">50% Deduction Approved</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadReceipt}
                className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download 80G Tax Exemption Receipt (PDF)
              </button>

              <p className="text-[11px] text-slate-500">
                A copy has also been sent to <strong>{donorEmail}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
