"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";

const scopes = [
    "Social Media Strategy",
    "Lead Funnel Optimization",
    "Targeted Lead Generation",
    "Performance Marketing ROI",
];

export const Contact = () => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [formState, setFormState] = useState({ name: "", mobile: "", message: "" });

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
        const body = `
Name: ${formState.name}
Mobile Number: ${formState.mobile}

Consultation Focus Points:
${selectedScopes.length > 0 ? selectedScopes.map(s => `- ${s}`).join('\n') : "None selected"}

Project Details:
${formState.message}
        `.trim();

        const url = `mailto:valoradimensions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">

                    {/* 1. Consultation Focus Card - Top on Mobile, Top-Right on Desktop */}
                    <div className="flex justify-end w-full lg:order-2 order-first lg:col-start-2 lg:row-start-1 h-fit">
                        <BlurFade delay={0.3} inView className="w-full max-w-[450px]">
                            <div className="bg-[#121212] border border-white/5 p-10 rounded-3xl w-full shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-8 text-center italic uppercase tracking-tighter">Consultation Focus</h3>
                                <Link
                                    href="https://calendly.com/valoradimensions/15?month=2026-02"
                                    target="_blank"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.3)] active:scale-[0.98] text-center block text-sm tracking-tight"
                                >
                                    Book my consultation
                                </Link>
                            </div>
                        </BlurFade>
                    </div>

                    {/* 2. Left Column: Heading and Form - Middle on Mobile, Left-Full on Desktop */}
                    <div className="flex flex-col justify-between lg:order-1 order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                        <div className="space-y-12">
                            <BlurFade delay={0.1} inView>
                                <div className="space-y-8">
                                    <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                                        Let's create <br />
                                        something <br />
                                        <span className="text-blue-500">extraordinary.</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg md:text-xl max-w-sm font-medium leading-relaxed">
                                        Ready to elevate your brand? Tell us about your project and we'll craft the perfect solution.
                                    </p>
                                </div>
                            </BlurFade>

                            <BlurFade delay={0.2} inView>
                                <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/20 transition-all placeholder:text-gray-700 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91 00000 00000"
                                            value={formState.mobile}
                                            onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/20 transition-all placeholder:text-gray-700 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Project Details</label>
                                        <textarea
                                            required
                                            placeholder="Tell us about your goals..."
                                            rows={6}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-[#121212] border border-white/5 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/20 transition-all placeholder:text-gray-700 font-medium resize-none shadow-inner"
                                        />
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
                                    <p className="text-gray-400 font-bold text-sm text-left lg:text-left tracking-wide">
                                        Select the areas you want to discuss during our call:
                                    </p>
                                    <div className="space-y-3">
                                        {scopes.map((scope) => (
                                            <div
                                                key={scope}
                                                onClick={() => toggleScope(scope)}
                                                className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${selectedScopes.includes(scope)
                                                    ? "bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                                    : "bg-[#121212] border-white/5 hover:border-white/10"
                                                    }`}
                                            >
                                                <span className={`font-bold text-sm ${selectedScopes.includes(scope) ? "text-white" : "text-gray-600"}`}>
                                                    {scope}
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${selectedScopes.includes(scope)
                                                    ? "bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                                    : "border-white/10"
                                                    }`}>
                                                    {selectedScopes.includes(scope) && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
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
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 flex items-center gap-3 text-sm tracking-tighter"
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
