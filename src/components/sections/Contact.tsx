"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";

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
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Let's create something <span className="text-violet-500">extraordinary</span>.
                        </h2>
                        <p className="text-violet-200 mb-12 text-lg">
                            Ready to elevate your brand? Tell us about your project and we'll craft the perfect solution.
                        </p>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-violet-200">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-violet-300/40"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-violet-200">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-violet-300/40"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-violet-200">Project Details</label>
                                <textarea
                                    placeholder="Tell us about your goals..."
                                    rows={4}
                                    className="w-full glass-input rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-violet-300/40 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                            >
                                Send Message <ChevronRight className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>

                    {/* Project Scope / "Cart" Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:pl-10"
                    >
                        <GlassCard className="h-full bg-white/5 backdrop-blur-2xl border-white/10 relative overflow-hidden p-8 flex flex-col items-center text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-[50px] -mr-16 -mt-16" />

                            <h3 className="text-xl font-bold text-white mb-6">Project Scope</h3>
                            <p className="text-sm text-violet-200 mb-6">Select the services you're interested in:</p>

                            <div className="space-y-4 w-full">
                                {scopes.map((scope) => (
                                    <div
                                        key={scope}
                                        onClick={() => toggleScope(scope)}
                                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedScopes.includes(scope)
                                            ? "bg-violet-600/20 border-violet-500/50 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        <span className={`font-medium ${selectedScopes.includes(scope) ? "text-white" : "text-violet-300/80"}`}>
                                            {scope}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedScopes.includes(scope) ? "bg-violet-500 border-violet-500" : "border-violet-500/30"
                                            }`}>
                                            {selectedScopes.includes(scope) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 w-full">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-violet-200">Estimated Timeline</span>
                                    <span className="text-white font-medium">4-8 Weeks</span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
