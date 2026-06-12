"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Check, ChevronRight, ChevronDown } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const scopes = [
    "iGaming Acquisition & Scale",
    "Social Media Growth Systems",
    "Performance Funnel Optimization",
    "Brand Strategy & Positioning",
];

export const Contact = () => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [formState, setFormState] = useState({ name: "", mobile: "", email: "", budget: "" });

    // Load saved details if consent is active
    const loadDetailsIfConsented = () => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") {
            const savedName = localStorage.getItem("form_name") || "";
            const savedMobile = localStorage.getItem("form_mobile") || "";
            const savedEmail = localStorage.getItem("form_email") || "";
            setFormState(prev => ({
                ...prev,
                name: savedName || prev.name,
                mobile: savedMobile || prev.mobile,
                email: savedEmail || prev.email
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
            if (formState.email) localStorage.setItem("form_email", formState.email);
        }
    }, [formState.name, formState.mobile, formState.email]);

    const toggleScope = (scope: string) => {
        if (selectedScopes.includes(scope)) {
            setSelectedScopes(selectedScopes.filter((s) => s !== scope));
        } else {
            setSelectedScopes([...selectedScopes, scope]);
        }
    };

    const sendTelegramLeadNotification = async () => {
        const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        if (!token || token === "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
            console.warn("Telegram bot token not configured or is placeholder.");
            return;
        }

        const chatId = "6119282606";
        const scopesStr = selectedScopes.length > 0 
            ? selectedScopes.map(s => `• ${s}`).join("\n") 
            : "None selected";

        let diagnosticStr = "";
        try {
            const savedDiagnostic = localStorage.getItem("valora_diagnostic_results");
            if (savedDiagnostic) {
                const diagData = JSON.parse(savedDiagnostic);
                if (diagData.answers && diagData.answers.length > 0) {
                    diagnosticStr = `\n📋 *Brand Diagnostic Results:*\n` + diagData.answers.map((ans: any) => {
                        return `• _${ans.question}_\n  ↳ *${ans.answer.toUpperCase()}*`;
                    }).join("\n");
                }
            }
        } catch (e) {
            console.error("Error reading diagnostic results from localStorage", e);
        }

        const text = `⚡ *New Lead Captured!*\n\n` +
            `👤 *Name:* ${formState.name}\n` +
            `📞 *Mobile:* ${formState.mobile}\n` +
            `📧 *Email:* ${formState.email}\n` +
            `💰 *Budget:* ${formState.budget}\n` +
            `🔌 *Platform Preferred:* TELEGRAM & EMAIL\n\n` +
            `🎯 *Areas of Interest:*\n${scopesStr}\n` +
            diagnosticStr +
            `\n\n📅 *Status:* Active Funnel Pipeline`;

        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    chat_id: chatId, 
                    text, 
                    parse_mode: "Markdown" 
                })
            });
        } catch (err) {
            console.error("Failed to send lead notification to Telegram:", err);
        }
    };

    const validateAndSend = async () => {
        if (!formState.name || !formState.mobile || !formState.email || !formState.budget) {
            alert("Please fill in your Name, Mobile Number, Email Address, and Budget Cap first!");
            return;
        }

        // Send full telemetry notification to Telegram in the background (awaited to guarantee delivery)
        await sendTelegramLeadNotification();

        // Retrieve diagnostic results to add a short note
        let diagnosticNote = "";
        try {
            const savedDiagnostic = localStorage.getItem("valora_diagnostic_results");
            if (savedDiagnostic) {
                const diagData = JSON.parse(savedDiagnostic);
                if (diagData.recommendedServices && diagData.recommendedServices.length > 0) {
                    diagnosticNote = `\n(Diagnostic: ${diagData.recommendedServices.length} gaps identified)`;
                } else {
                    diagnosticNote = `\n(Diagnostic: Solid structure)`;
                }
            }
        } catch (e) {
            console.error("Error reading diagnostic data:", e);
        }

        const scopeString = selectedScopes.length > 0
            ? selectedScopes.join(', ')
            : "None selected";

        // Structured, short WhatsApp message
        const waText = `Hey Valora team, I'm interested in growing my brand!

👤 Name: ${formState.name}
📞 Mobile: ${formState.mobile}
📧 Email: ${formState.email}
💰 Budget: ${formState.budget}
🎯 Focus: ${scopeString}${diagnosticNote}`;

        const url = `https://wa.me/919500015061?text=${encodeURIComponent(waText)}`;
        window.location.href = url;
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
            {/* Ambient glows */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-deep-blue/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute top-10 right-0 w-96 h-96 bg-brand-cyan/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 gaming-grid opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-md mx-auto w-full space-y-8">
                    
                    {/* Header */}
                    <BlurFade delay={0.1} inView>
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic pr-4">
                                Let&apos;s create <br />
                                <span className="text-brand-cyan">something</span> <br />
                                extraordinary.
                            </h2>
                            <p className="text-brand-white/70 text-base max-w-sm mx-auto leading-relaxed">
                                Ready to elevate your brand? Tell us
                            </p>
                        </div>
                    </BlurFade>

                    {/* Compact Interactive Panel */}
                    <BlurFade delay={0.2} inView>
                        <GlassCard variant="hud" className="p-6 bg-[#08111e]/90 border-brand-cyan/20 flex flex-col gap-4 min-h-[440px] justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                            
                            {/* Card Header Title */}
                            <div className="text-center pb-2 border-b border-brand-white/5 shrink-0">
                                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-cyan">
                                    Book Consultation
                                </h3>
                            </div>

                            {/* Content Form Panel */}
                            <div className="flex-1 flex flex-col justify-center mt-2">
                                <div className="space-y-4 w-full">
                                    <div className="space-y-3">
                                        {/* Grid 1: Name and Mobile */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1 text-left">
                                                <label className="text-[9px] font-bold text-brand-white/40 uppercase tracking-wider font-mono">Your Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-white/35 transition-all placeholder:text-brand-white/20 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1 text-left">
                                                <label className="text-[9px] font-bold text-brand-white/40 uppercase tracking-wider font-mono">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+91 00000..."
                                                    value={formState.mobile}
                                                    onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                                                    className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-white/35 transition-all placeholder:text-brand-white/20 font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Grid 2: Email and Budget */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1 text-left">
                                                <label className="text-[9px] font-bold text-brand-white/40 uppercase tracking-wider font-mono">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    className="w-full bg-[#08111e]/25 border border-brand-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-white/35 transition-all placeholder:text-brand-white/20 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1 text-left">
                                                <label className="text-[9px] font-bold text-brand-white/40 uppercase tracking-wider font-mono">Budget Cap</label>
                                                <div className="relative">
                                                    <select
                                                        required
                                                        value={formState.budget}
                                                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                                                        className="w-full bg-[#070d19] border border-brand-white/10 rounded-xl px-3 py-2.5 text-[10px] text-white focus:outline-none focus:border-brand-white/35 transition-all font-medium appearance-none cursor-pointer text-brand-white"
                                                    >
                                                        <option value="" disabled className="bg-[#08111e] text-brand-white/30">Select...</option>
                                                        <option value="Under $1,000 / mo" className="bg-[#08111e] text-white">Under $1k/mo</option>
                                                        <option value="$1,000 - $3,000 / mo" className="bg-[#08111e] text-white">$1k – $3k/mo</option>
                                                        <option value="$3,000 - $5,000 / mo" className="bg-[#08111e] text-white">$3k – $5k/mo</option>
                                                        <option value="$5,000 - $10,000 / mo" className="bg-[#08111e] text-white">$5k – $10k/mo</option>
                                                        <option value="$10,000 - $25,000 / mo" className="bg-[#08111e] text-white">$10k – $25k/mo</option>
                                                        <option value="$25,000+ / mo" className="bg-[#08111e] text-white">$25k+/mo</option>
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-white/30">
                                                        <ChevronDown className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scopes Grid 2x2 */}
                                    <div className="space-y-2">
                                        <p className="text-brand-white/40 font-bold text-[9px] font-mono text-left tracking-wider uppercase">
                                            Areas to discuss
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {scopes.map((scope) => {
                                                const isSelected = selectedScopes.includes(scope);
                                                return (
                                                    <div
                                                        key={scope}
                                                        onClick={() => toggleScope(scope)}
                                                        className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all duration-300 ${isSelected
                                                            ? "bg-brand-white/5 border-brand-white/25"
                                                            : "bg-[#08111e]/25 border-brand-white/10 hover:border-brand-white/20"
                                                            }`}
                                                    >
                                                        <span className={`font-bold text-[9px] leading-tight font-sans text-left ${isSelected ? "text-white" : "text-brand-white/40"}`}>
                                                            {scope}
                                                        </span>
                                                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all shrink-0 ${isSelected
                                                            ? "bg-brand-orange border-brand-orange"
                                                            : "border-brand-white/15"
                                                            }`}>
                                                            {isSelected && <Check className="w-2 h-2 text-white stroke-[3.5px]" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        onClick={() => validateAndSend()}
                                        className="w-full group relative py-3 bg-gradient-to-r from-brand-orange to-brand-yellow hover:scale-[1.01] active:scale-95 transition-all duration-300 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-[0_0_15px_rgba(251,133,0,0.25)] border border-brand-orange/30 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <span>Send Inquiry</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </BlurFade>
                    
                </div>
            </div>
        </section>
    );
};
