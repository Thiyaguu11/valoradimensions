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
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-zinc-900/90 border border-white/10 rounded-3xl shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Case Studies</h2>
                                <p className="text-blue-200/50 text-sm font-medium mt-1">Discover how we drive extraordinary growth</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:rotate-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {dummyCaseStudies.map((study, index) => (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <GlassCard className="group h-full flex flex-col overflow-hidden bg-white/[0.03] border-white/5 hover:border-blue-500/30 transition-all duration-500">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={study.image}
                                                    alt={study.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="px-3 py-1 rounded-full bg-blue-600/90 text-[10px] font-black uppercase tracking-widest text-white">
                                                        {study.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                                    {study.title}
                                                </h3>
                                                <p className="text-blue-100/60 text-sm leading-relaxed mb-6 flex-1">
                                                    {study.description}
                                                </p>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    {study.stats.map((stat, i) => (
                                                        <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                                                            <div className="text-lg font-black text-blue-400">{stat.value}</div>
                                                            <div className="text-[10px] text-blue-200/40 uppercase font-bold">{stat.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:border-blue-500 transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
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
                                    <GlassCard className="h-full border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-12 text-center opacity-40 hover:opacity-60 transition-opacity">
                                        <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4">
                                            <ArrowRight className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 italic">Your Success Story Here</h3>
                                        <p className="text-blue-200/60 text-sm">Join our network of thriving brands and let's craft your growth dimension.</p>
                                    </GlassCard>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 md:p-8 bg-blue-600/5 border-t border-white/5 text-center">
                            <p className="text-blue-200/60 text-sm font-medium">Ready to see these results for your brand?</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
                            >
                                Let's Discuss Your Project
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
