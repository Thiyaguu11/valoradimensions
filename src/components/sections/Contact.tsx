"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";
import confetti from "canvas-confetti";

const scopes = [
    "Social Media Strategy",
    "Lead Funnel Optimization",
    "Targeted Lead Generation",
    "Performance Marketing ROI",
];

export const Contact = () => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    const toggleScope = (scope: string) => {
        if (selectedScopes.includes(scope)) {
            setSelectedScopes(selectedScopes.filter((s) => s !== scope));
        } else {
            setSelectedScopes([...selectedScopes, scope]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Celebration
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#2563eb', '#ffffff']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#2563eb', '#ffffff']
            });
        }, 250);

        // Mail Logic
        const subject = `New Project Inquiry from ${formState.name}`;
        const body = `
Name: ${formState.name}
Email: ${formState.email}

Requested Scopes:
${selectedScopes.length > 0 ? selectedScopes.map(s => `- ${s}`).join('\n') : "None selected"}

Project Details:
${formState.message}
        `.trim();

        const mailtoUrl = `mailto:valoradimensions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Brief delay for confetti pop before redirect
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 1000);
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade delay={0.1} inView>
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase mb-6">
                            CONTACT US
                        </h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto text-lg font-medium">
                            Get a Free Consultation for Your Custom Growth Playbook.
                        </p>
                    </div>
                </BlurFade>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Form Side */}
                    <BlurFade delay={0.1} inView>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Let's create something <span className="text-blue-500">extraordinary</span>.
                            </h2>
                            <p className="text-blue-200 mb-12 text-lg">
                                Ready to elevate your brand? Tell us about your project and we'll craft the perfect solution.
                            </p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Project Details</label>
                                    <textarea
                                        required
                                        placeholder="Tell us about your goals..."
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30_rgba(59,130,246,0.5)] active:scale-[0.98]"
                                >
                                    Send Message <ChevronRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </BlurFade>

                    {/* Project Scope / "Cart" Side */}
                    <BlurFade delay={0.2} inView>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:pl-10"
                        >
                            <GlassCard className="h-full bg-white/5 backdrop-blur-2xl border-white/10 relative overflow-hidden p-8 flex flex-col items-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Consultation Focus</h3>
                                <p className="text-md text-blue-200 mb-8 font-medium">Select the areas you want to discuss during our call:</p>

                                <div className="space-y-4 w-full">
                                    {scopes.map((scope) => (
                                        <div
                                            key={scope}
                                            onClick={() => toggleScope(scope)}
                                            className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${selectedScopes.includes(scope)
                                                ? "bg-blue-600/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <span className={`font-semibold text-base md:text-lg ${selectedScopes.includes(scope) ? "text-white" : "text-blue-200"}`}>
                                                {scope}
                                            </span>
                                            <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${selectedScopes.includes(scope) ? "bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "border-blue-500/30"
                                                }`}>
                                                {selectedScopes.includes(scope) && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 w-full">
                                    <Link
                                        href="https://calendly.com/valoradimensions/15?month=2026-02"
                                        target="_blank"
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30_rgba(59,130,246,0.5)] active:scale-95"
                                    >
                                        Book my consultation
                                    </Link>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
};
