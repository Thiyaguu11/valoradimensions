"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        title: "Neon Horizon",
        category: "Branding",
        gradient: "from-blue-600 to-cyan-600",
    },
    {
        title: "Apex Finance",
        category: "Web Development",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        title: "Velvet Touch",
        category: "Marketing",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        title: "Orbit Systems",
        category: "SaaS Product",
        gradient: "from-amber-400 to-orange-500",
    },
];

export const Brandfolio = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="brandfolio" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">
                        Selected Work
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">Brandfolio</h2>
                    <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto">
                        Explore our latest projects and success stories across branding, web, and marketing.
                    </p>
                </motion.div>
            </div>

            <div className="relative z-10 px-6 max-w-7xl mx-auto">
                <div className="flex overflow-x-auto pb-8 gap-8 scrollbar-hide snap-x snap-mandatory no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="min-w-[300px] md:min-w-[400px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden snap-center group hover:border-blue-500/30 transition-all duration-500"
                        >
                            {/* Image Placeholder */}
                            <div className={`h-56 w-full bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500 flex items-center justify-center`}>
                                <ExternalLink className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/20">
                                        {project.category}
                                    </span>
                                    <span className="text-blue-200/40 text-xs">Mar 16, 2024</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-blue-200/60 text-sm leading-relaxed mb-8">
                                    Comprehensive digital transformation and strategic brand positioning for market leadership.
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 border border-white/10" />
                                    <div>
                                        <div className="text-white font-medium text-sm">Alex Rivera</div>
                                        <div className="text-blue-200/40 text-xs">Creative Director</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-4">
                    {projects.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === index
                                ? "w-8 bg-violet-500"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12 flex justify-center">
                <button className="text-white bg-white/5 border border-white/10 px-8 py-3 rounded-full hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-2 group">
                    View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};
