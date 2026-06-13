"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "./GlassCard";

interface CaseStudy {
    id: number;
    title: string;
    category: string;
    description: string;
    stats: { label: string; value: string }[];
    image: string;
}

const dummyCaseStudies: CaseStudy[] = [
    {
        id: 1,
        title: "E-commerce Growth Engine",
        category: "Performance Marketing",
        description: "How we scaled a D2C fashion brand from 0 to ₹50L monthly revenue in just 6 months through precision-targeted meta ads and conversion rate optimization.",
        stats: [
            { label: "ROAS", value: "4.5x" },
            { label: "Revenue Growth", value: "400%" },
        ],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "SaaS Lead Gen Mastery",
        category: "B2B Strategy",
        description: "Implemented a full-funnel lead generation system that reduced cost-per-qualified-lead by 65% while increasing demo bookings by 3x for a Fintech startup.",
        stats: [
            { label: "Leads/Month", value: "250+" },
            { label: "CPL Reduction", value: "65%" },
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Luxury Brand Reimagined",
        category: "Brand Strategy",
        description: "A complete digital transformation for a high-end jewelry brand, focusing on high-authority content and an immersive visual storytelling approach.",
        stats: [
            { label: "Engagement Rate", value: "+120%" },
            { label: "Store Visits", value: "+45%" },
        ],
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800",
    },
];

interface CaseStudiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CaseStudiesModal = ({ isOpen, onClose }: CaseStudiesModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-6xl h-[85%] max-h-[90vh] overflow-hidden bg-[#08111e]/95 border border-brand-cyan/20 rounded-3xl shadow-[0_0_50px_rgba(0,168,232,0.15)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-brand-cyan/15 flex items-center justify-between bg-brand-deep-blue/5">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-wider font-mono">Case Studies</h2>
                                <p className="text-brand-cyan/50 text-sm font-medium mt-1">Discover how we drive extraordinary growth</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-brand-deep-blue/20 hover:bg-brand-cyan/25 border border-brand-cyan/30 text-white transition-all hover:rotate-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {dummyCaseStudies.map((study, index) => (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <GlassCard variant="hud" className="group h-full flex flex-col overflow-hidden bg-[#08111e]/95 border-brand-cyan/15 hover:border-brand-cyan/45 transition-all duration-500 shadow-lg">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={study.image}
                                                    alt={study.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-transparent" />
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="px-3 py-1 rounded-full bg-brand-orange text-[10px] font-black uppercase tracking-wider text-white font-mono shadow-[0_0_10px_rgba(251,133,0,0.3)]">
                                                        {study.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                                                    {study.title}
                                                </h3>
                                                <p className="text-brand-white/70 text-sm leading-relaxed mb-6 flex-1">
                                                    {study.description}
                                                </p>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    {study.stats.map((stat, i) => (
                                                        <div key={i} className="p-3 rounded-xl bg-brand-black/40 border border-brand-deep-blue/20">
                                                            <div className="text-lg font-black text-brand-cyan font-mono">{stat.value}</div>
                                                            <div className="text-[10px] text-brand-white/40 uppercase font-bold font-mono">{stat.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="w-full py-3 rounded-xl border border-brand-cyan/30 bg-brand-deep-blue/20 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-orange hover:border-brand-orange transition-all group-hover:shadow-[0_0_15px_rgba(251,133,0,0.3)] font-mono">
                                                    View Details <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}

                                {/* Placeholder for more */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <GlassCard variant="hud" className="h-full border-dashed border-brand-cyan/20 bg-transparent flex flex-col items-center justify-center p-12 text-center opacity-50 hover:opacity-75 transition-opacity">
                                        <div className="w-16 h-16 rounded-full border border-dashed border-brand-cyan/30 flex items-center justify-center mb-4">
                                            <ArrowRight className="w-6 h-6 text-brand-cyan" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 italic uppercase">Your Success Story Here</h3>
                                        <p className="text-brand-white/65 text-sm">Join our network of thriving brands and let&apos;s craft your growth dimension.</p>
                                    </GlassCard>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 md:p-8 bg-brand-deep-blue/10 border-t border-brand-cyan/20 text-center">
                            <p className="text-brand-white/80 text-sm font-medium">Ready to see these results for your brand?</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-8 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(251,133,0,0.3)] hover:shadow-[0_0_30px_rgba(251,133,0,0.5)] active:scale-95 font-mono uppercase tracking-wider text-xs border border-brand-orange/40"
                            >
                                Let&apos;s Discuss Your Project
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
