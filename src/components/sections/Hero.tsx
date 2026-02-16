"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import NumberTicker from "@/components/ui/NumberTicker";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="container px-6 relative z-10 mx-auto max-w-7xl flex items-center justify-center">
                <GlassCard
                    variant="hero"
                    className="p-12 md:p-16 max-w-4xl mx-auto flex flex-col items-center justify-center text-center backdrop-filter backdrop-blur-3xl border border-white/20 shadow-2xl bg-white/5"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="flex justify-center">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/10 text-xs text-violet-200 font-medium tracking-wide uppercase backdrop-blur-md">
                                Welcome to the future of branding
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-lg"
                        >
                            Valora Dimensions is a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300 drop-shadow-sm">
                                growth-driven
                            </span>{" "}
                            marketing partner.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-violet-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                        >
                            Helping brands scale through strategy, content, and performance. We build digital experiences that convert.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-violet-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-300 ease-out z-0 opacity-10" />
                            </button>
                            <button className="px-8 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-md shadow-md hover:shadow-lg">
                                <PlayCircle className="w-4 h-4 text-violet-300" />
                                Watch Showreel
                            </button>
                        </motion.div>
                    </motion.div>
                </GlassCard>

                {/* Floating cards for visual interest */}
                <div className="absolute bottom-20 left-10 hidden lg:block animate-float-slow">
                    <GlassCard className="w-64 p-4 bg-black/20 backdrop-blur-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-green-400 text-xs">▲</span>
                            </div>
                            <span className="text-violet-100 text-sm font-medium">Growth Metrics</span>
                        </div>
                        <div className="text-2xl font-bold text-white flex items-center gap-1">
                            +<NumberTicker value={145} className="text-white" />%
                        </div>
                        <div className="text-xs text-violet-300">Client Revenue YoY</div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};
