'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

import confetti from 'canvas-confetti';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function LeadCaptureModal({ isOpen, onClose, onSubmit }: LeadCaptureModalProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, status: '' });
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        industry: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.company.trim()) newErrors.company = 'Company is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const form = formRef.current;
        if (!form) return;

        setLoading(true);

        // Extracting values using the named items from the form
        const formDataObj = new FormData(form);
        const payload = {
            fullName: formDataObj.get('fullName'),
            emailId: formDataObj.get('email'),
            phoneNumber: formDataObj.get('phone'),
            companyName: formDataObj.get('company'),
            industry: formDataObj.get('industry'),
        };

        try {
            // Using Axios to call our internal API route
            const response = await axios.post('/api/enquiry', payload);

            if (response.status === 200) {
                // Success confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.5, y: 0.5 }
                });

                setModal({ show: true, status: 'success' });
                form.reset();

                // Allow user to see success message for a moment before closing/proceeding
                setTimeout(() => {
                    onSubmit(formData);
                }, 1500);
            }
        } catch (err) {
            console.error('Submission Error:', err);
            setModal({ show: true, status: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white border-[1.5px] border-black rounded-[20px] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg relative z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
                        <p className="text-slate-600 mb-6 font-medium">Enter your details to calculate your full savings report.</p>

                        <form
                            ref={formRef}
                            onSubmit={handleEnquirySubmit}
                            className={`space-y-4 transition-opacity duration-300 ${modal.show && modal.status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <div>
                                <label className="block text-sm font-bold mb-1">Full Name*</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border-[1.5px] ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium`}
                                    placeholder="John Doe"
                                    required
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1 font-bold">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border-[1.5px] ${errors.email ? 'border-red-500 bg-red-50' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium`}
                                    placeholder="john@company.com"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Company*</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl border-[1.5px] ${errors.company ? 'border-red-500 bg-red-50' : 'border-black'} focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium`}
                                    placeholder="Acme Inc."
                                    required
                                />
                                {errors.company && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-[1.5px] border-black focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium"
                                        placeholder="+1 234 567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Industry</label>
                                    <input
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-[1.5px] border-black focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 transition-all font-medium"
                                        placeholder="Technology"
                                    />
                                </div>
                            </div>

                            {modal.show && modal.status === 'error' && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-600">
                                    <AlertCircle size={20} />
                                    <p className="text-sm font-bold">Something went wrong. Please try again.</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0066FF] text-white font-bold text-lg py-4 rounded-2xl border-[1.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] mt-4 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : 'Show Results'}
                            </button>
                        </form>

                        {modal.show && modal.status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white rounded-[20px] z-20"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Success!</h3>
                                <p className="text-slate-600 font-medium">Your details have been captured. Generating your report now...</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
