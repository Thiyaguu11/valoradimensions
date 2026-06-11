"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cookie, Check, X } from "lucide-react";

export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Delay popup by 2 seconds to let the user settle in
        const timer = setTimeout(() => {
            const consent = localStorage.getItem("cookieConsent");
            if (!consent) {
                setShow(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShow(false);
        // Dispatch custom event to notify other components (like Contact form) immediately
        window.dispatchEvent(new Event("cookieConsentChanged"));
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShow(false);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 w-full max-w-sm px-4 sm:px-0"
                >
                    <GlassCard className="p-6 bg-[#08111e]/95 border-brand-cyan/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        {/* Soft ambient background aura */}
                        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,168,232,0.3),transparent_70%)]" />

                        <div className="space-y-4 relative z-10">
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center">
                                    <Cookie className="w-5 h-5 text-brand-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-sm uppercase tracking-wider font-sans">
                                        Enable Autofill
                                    </h4>
                                    <p className="text-[9px] text-brand-cyan font-mono font-bold uppercase tracking-widest">
                                        Smart Cookie Consent
                                    </p>
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-brand-white/70 text-xs leading-relaxed font-medium">
                                We use cookies to save your contact details (name and phone) locally so you can fill out our forms instantly on future visits.
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-2.5 pt-2">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-brand-orange to-brand-yellow hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(251,133,0,0.25)] cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <Check className="w-3.5 h-3.5" /> Allow Autofill
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-white/40 hover:text-brand-white/80 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
