"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Check, ChevronRight, ChevronDown } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";
import { GlassCard } from "@/components/ui/GlassCard";

const scopes = [
    "iGaming Acquisition & Scale",
    "Social Media Growth Systems",
    "Performance Funnel Optimization",
    "Brand Strategy & Positioning",
];

export const Contact = () => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [formState, setFormState] = useState({ name: "", mobile: "", budget: "" });

    // Load saved details if consent is active
    const loadDetailsIfConsented = () => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") {
            const savedName = localStorage.getItem("form_name") || "";
            const savedMobile = localStorage.getItem("form_mobile") || "";
            setFormState(prev => ({
                ...prev,
                name: savedName || prev.name,
                mobile: savedMobile || prev.mobile
            }));
        }
    };

    useEffect(() => {
        loadDetailsIfConsented();

        // Listen for cookie consent change event
        window.addEventListener("cookieConsentChanged", loadDetailsIfConsented);
        return () => {
            window.removeEventListener("cookieConsentChanged", loadDetailsIfConsented);
        };
    }, []);

    // Save details on change if consent is active
    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") {
            if (formState.name) localStorage.setItem("form_name", formState.name);
            if (formState.mobile) localStorage.setItem("form_mobile", formState.mobile);
        }
    }, [formState.name, formState.mobile]);

    const toggleScope = (scope: string) => {
        if (selectedScopes.includes(scope)) {
            setSelectedScopes(selectedScopes.filter((s) => s !== scope));
        } else {
            setSelectedScopes([...selectedScopes, scope]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Mail Logic
        const subject = `New Project Inquiry from ${formState.name}`;
        const emailBody = `
Name: ${formState.name}
Mobile Number: ${formState.mobile}

Consultation Focus Points:
${selectedScopes.length > 0 ? selectedScopes.map(s => `- ${s}`).join('\n') : "None selected"}

Marketing Budget Cap:
${formState.budget}
        `.trim();

        const mailtoUrl = `mailto:valoradimensions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
            {/* Ambient glows */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep-blue/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute top-10 right-0 w-96 h-96 bg-brand-cyan/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 gaming-grid opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">

                    {/* 1. Consultation Focus Card - Top on Mobile, Top-Right on Desktop */}
                    <div className="flex justify-end w-full lg:order-2 order-first lg:col-start-2 lg:row-start-1 h-fit">
                        <BlurFade delay={0.3} inView className="w-full max-w-[450px]">
                            <GlassCard variant="hud" className="p-10 w-full bg-[#08111e]/90 border-brand-cyan/20">
                                <h3 className="text-2xl font-black text-white mb-8 text-center italic uppercase tracking-wider font-mono">Consultation Focus</h3>
                                <Link
                                    href="https://calendly.com/valoradimensions/15?month=2026-02"
                                    target="_blank"
                                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(251,133,0,0.3)] hover:shadow-[0_0_30px_rgba(251,133,0,0.55)] border border-brand-orange/35 active:scale-[0.98] text-center block text-sm tracking-wider uppercase font-mono"
                                >
                                    Book my consultation
                                </Link>
                            </GlassCard>
                        </BlurFade>
                    </div>

                    {/* 2. Left Column: Heading and Form - Middle on Mobile, Left-Full on Desktop */}
                    <div className="flex flex-col justify-between lg:order-1 order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                        <div className="space-y-12">
                            <BlurFade delay={0.1} inView>
                                <div className="space-y-8">
                                    <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                                        Let&apos;s create <br />
                                        something <br />
                                        <span className="text-brand-cyan">extraordinary.</span>
                                    </h2>
                                    <p className="text-brand-white/70 text-lg md:text-xl max-w-sm font-medium leading-relaxed">
                                        Ready to elevate your brand? Tell us about your project and we&apos;ll craft the perfect solution.
                                    </p>
                                </div>
                            </BlurFade>

                            <BlurFade delay={0.2} inView>
                                <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-brand-white/40 uppercase tracking-widest font-mono">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-brand-white/35 transition-all placeholder:text-brand-white/20 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-brand-white/40 uppercase tracking-widest font-mono">Mobile Number</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91 00000 00000"
                                            value={formState.mobile}
                                            onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                                            className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-brand-white/35 transition-all placeholder:text-brand-white/20 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-brand-white/40 uppercase tracking-widest font-mono">Marketing Budget Cap</label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={formState.budget}
                                                onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                                                className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-brand-white/35 transition-all font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-[#08111e] text-brand-white/30">Select a Budget Cap...</option>
                                                <option value="Under $1,000 / mo" className="bg-[#08111e] text-white">Under $1,000 / month</option>
                                                <option value="$1,000 - $3,000 / mo" className="bg-[#08111e] text-white">$1,000 – $3,000 / month</option>
                                                <option value="$3,000 - $5,000 / mo" className="bg-[#08111e] text-white">$3,000 – $5,000 / month</option>
                                                <option value="$5,000 - $10,000 / mo" className="bg-[#08111e] text-white">$5,000 – $10,000 / month</option>
                                                <option value="$10,000 - $25,000 / mo" className="bg-[#08111e] text-white">$10,000 – $25,000 / month</option>
                                                <option value="$25,000+ / mo" className="bg-[#08111e] text-white">$25,000+ / month</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-white/30">
                                                <ChevronDown className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </BlurFade>
                        </div>
                    </div>

                    {/* 3. Bottom Group: Checklist + Send Message Button - Bottom on both */}
                    <div className="flex flex-col justify-end h-full w-full lg:order-3 order-3 lg:col-start-2 lg:row-start-2">
                        <div className="space-y-10 flex flex-col items-end w-full pt-12 lg:pt-0">
                            {/* Focus Points List */}
                            <BlurFade delay={0.4} inView className="w-full">
                                <div className="space-y-6">
                                    <p className="text-brand-white/60 font-bold text-sm text-left lg:text-left tracking-wide">
                                        Select the areas you want to discuss during our call:
                                    </p>
                                    <div className="space-y-3">
                                        {scopes.map((scope) => (
                                            <div
                                                key={scope}
                                                onClick={() => toggleScope(scope)}
                                                className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedScopes.includes(scope)
                                                    ? "bg-brand-white/5 border-brand-white/25"
                                                    : "bg-[#08111e]/25 border-brand-white/10 hover:border-brand-white/20"
                                                    }`}
                                            >
                                                <span className={`font-bold text-sm font-sans ${selectedScopes.includes(scope) ? "text-white" : "text-brand-white/40"}`}>
                                                    {scope}
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${selectedScopes.includes(scope)
                                                    ? "bg-brand-orange border-brand-orange"
                                                    : "border-brand-white/15"
                                                    }`}>
                                                    {selectedScopes.includes(scope) && <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </BlurFade>

                            {/* Send Message Button (Bottom Right) */}
                            <BlurFade delay={0.5} inView className="w-full flex justify-end">
                                <button
                                    form="contact-form"
                                    type="submit"
                                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-12 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(251,133,0,0.3)] hover:shadow-[0_0_30px_rgba(251,133,0,0.55)] border border-brand-orange/35 active:scale-95 flex items-center gap-3 text-sm tracking-wider uppercase font-mono"
                                >
                                    SEND MESSAGE <ChevronRight className="w-4 h-4" />
                                </button>
                            </BlurFade>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
