'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Heart, CheckCircle2, Download, AlertCircle } from 'lucide-react';
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
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState<string>(initialAmount ? initialAmount.toString() : '2500');
  const [donorPhone, setDonorPhone] = useState('');

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  // Validation Error States
  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formGeneralError, setFormGeneralError] = useState('');

  const [transactionId, setTransactionId] = useState('');
  const [receiptNo, setReceiptNo] = useState('');

  useEffect(() => {
    if (initialAmount) setDonationAmount(initialAmount.toString());
  }, [initialAmount]);

  if (!isOpen) return null;

  const phoneRegex = /^(?:(?:\+91)|(?:0))?[6-9]\d{9}$/;

  const validateFields = (): boolean => {
    let isValid = true;
    setNameError('');
    setAmountError('');
    setPhoneError('');
    setFormGeneralError('');

    // 1. Name Validation
    if (!donorName.trim() || donorName.trim().length < 2) {
      setNameError('Please enter your full name.');
      isValid = false;
    }

    // 2. Amount Validation
    const amtNum = Number(donationAmount);
    if (!donationAmount || isNaN(amtNum) || amtNum <= 0) {
      setAmountError('Please enter a valid donation amount in INR.');
      isValid = false;
    }

    // 3. Indian Mobile Number Validation
    const cleanPhone = donorPhone.replace(/\s+/g, '');
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number.');
      isValid = false;
    }

    return isValid;
  };

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const amtNum = Number(donationAmount);
    setStep('processing');

    const apiResult = await submitDonationToBackend({
      amount: amtNum,
      donorName: donorName.trim(),
      donorEmail: `${donorName.trim().toLowerCase().replace(/\s+/g, '.')}@donor.inamigos.org`,
      donorPhone: donorPhone.trim(),
      donorPan: 'N/A',
      paymentMode: 'UPI',
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
      setStep('form');
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
    const amtNum = Number(donationAmount);
    generate80GReceiptPDF({
      receiptNo,
      donorName,
      donorEmail: `${donorName.trim().toLowerCase().replace(/\s+/g, '.')}@donor.inamigos.org`,
      donorPhone,
      donorPan: 'N/A',
      amount: amtNum,
      paymentMode: 'UPI',
      transactionId,
      causeName: selectedCause ? selectedCause.title : 'General Relief & Hunger Fund',
      date: new Date().toLocaleString('en-IN'),
    });
  };

  const handleResetAndClose = () => {
    setStep('form');
    setNameError('');
    setAmountError('');
    setPhoneError('');
    setFormGeneralError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 overflow-hidden shadow-xl relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Heart className="w-5 h-5 fill-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {step === 'success' ? 'Donation Complete' : 'Make a Donation'}
              </h3>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure | Section 80G Certified
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedCause && step !== 'success' && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2 text-xs">
            <span className="text-slate-700 font-medium truncate block">
              Sponsoring: <strong className="text-slate-900">{selectedCause.title}</strong>
            </span>
          </div>
        )}

        {/* Minimal Form: Name, Amount, Phone */}
        {step === 'form' && (
          <form onSubmit={handleSimulatePayment} className="p-6 space-y-4">
            {formGeneralError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formGeneralError}</span>
              </div>
            )}

            <div className="space-y-3.5">
              {/* 1. Name Field */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  value={donorName}
                  onChange={(e) => {
                    setDonorName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                    nameError ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {nameError && <p className="text-[11px] text-red-600 font-bold mt-1">{nameError}</p>}
              </div>

              {/* 2. Amount Field (No Preset Buttons) */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Donation Amount (INR) *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-extrabold text-slate-400">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount in ₹..."
                    value={donationAmount}
                    onChange={(e) => {
                      setDonationAmount(e.target.value);
                      if (amountError) setAmountError('');
                    }}
                    className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-8 pr-3.5 text-sm font-bold text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                      amountError ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                    }`}
                  />
                </div>
                {amountError && <p className="text-[11px] text-red-600 font-bold mt-1">{amountError}</p>}
              </div>

              {/* 3. Mobile Number Field */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number (Indian) *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={donorPhone}
                  onChange={(e) => {
                    setDonorPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  className={`w-full bg-slate-50 border rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                    phoneError ? 'border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-emerald-600'
                  }`}
                />
                {phoneError && <p className="text-[11px] text-red-600 font-bold mt-1">{phoneError}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs mt-2"
            >
              Complete Donation
            </button>
          </form>
        )}

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Processing Donation...</h4>
              <p className="text-xs text-slate-400">Communicating with backend API server...</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-900">Thank You, {donorName}!</h4>
              <p className="text-xs text-slate-600">
                Your donation of <strong className="text-emerald-700">₹{Number(donationAmount).toLocaleString('en-IN')}</strong> has been successfully processed.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500">Receipt No:</span>
                <span className="text-emerald-700 font-bold">{receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-slate-800">{transactionId}</span>
              </div>
            </div>

            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download 80G Tax Receipt (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
