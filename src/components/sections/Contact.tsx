"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";

const scopes = [
    "Brand Identity",
    "Web Development",
    "Marketing Strategy",
    "Content Creation",
    "SEO & Performance",
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

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
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

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-200">Project Details</label>
                                    <textarea
                                        placeholder="Tell us about your goals..."
                                        rows={4}
                                        className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-blue-300/40 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
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
                            <GlassCard className="h-full bg-white/5 backdrop-blur-2xl border-white/10 relative overflow-hidden p-8 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-white mb-6">Project Scope</h3>
                                <p className="text-sm text-blue-200 mb-6">Select the services you're interested in:</p>

                                <div className="space-y-4 w-full">
                                    {scopes.map((scope) => (
                                        <div
                                            key={scope}
                                            onClick={() => toggleScope(scope)}
                                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedScopes.includes(scope)
                                                ? "bg-blue-600/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <span className={`font-medium ${selectedScopes.includes(scope) ? "text-white" : "text-blue-300/80"}`}>
                                                {scope}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedScopes.includes(scope) ? "bg-blue-500 border-blue-500" : "border-blue-500/30"
                                                }`}>
                                                {selectedScopes.includes(scope) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 w-full">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-blue-200">Estimated Timeline</span>
                                        <span className="text-white font-medium">4-8 Weeks</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
};
