"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, PlayCircle, ArrowLeft, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import NumberTicker from "@/components/ui/NumberTicker";
import { BlurFade } from "@/components/ui/BlurFade";
import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

export const Hero = () => {
    const [showShowreel, setShowShowreel] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
            {/* Interactive Grid Pattern Background - Full Page */}
            <div className="absolute inset-0 z-0">
                <InteractiveGridPattern
                    className={cn(
                        "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                        "absolute inset-0 h-full w-full"
                    )}
                />
            </div>

            <div className="container px-6 relative z-10 mx-auto max-w-7xl flex items-center justify-center">
                <BlurFade delay={0.2} duration={0.8} inView>
                    <GlassCard
                        variant="hero"
                        className="p-12 md:p-16 max-w-4xl mx-auto flex flex-col items-center justify-center text-center backdrop-filter backdrop-blur-3xl border border-white/20 shadow-2xl bg-white/5"
                    >
                        {/* ... Hero Content ... */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Staggered items inside the card can use itemVariants which now includes blur */}
                            <motion.div variants={itemVariants} className="flex justify-center">
                                <span className="px-3 py-1 rounded-full border border-white/10 bg-white/10 text-xs text-blue-200 font-medium tracking-wide uppercase backdrop-blur-md">
                                    Welcome to the future of branding
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-lg"
                            >
                                Valora Dimensions is a <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-sm">
                                    growth-driven
                                </span>{" "}
                                marketing partner.
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
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
                                    <div className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-300 ease-out z-0 opacity-10" />
                                </button>
                                <button
                                    onClick={() => setShowShowreel(true)}
                                    className="px-8 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-md shadow-md hover:shadow-lg"
                                >
                                    <PlayCircle className="w-4 h-4 text-blue-300" />
                                    Watch Showreel
                                </button>
                            </motion.div>
                        </motion.div>
                    </GlassCard>
                </BlurFade>

                {/* Floating cards for visual interest */}
                <div className="absolute bottom-20 left-10 hidden lg:block animate-float-slow">
                    <BlurFade delay={0.6} duration={0.8} inView>
                        <GlassCard className="w-64 p-4 bg-black/20 backdrop-blur-xl border border-white/10">
                            {/* ... Content ... */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <span className="text-green-400 text-xs">▲</span>
                                </div>
                                <span className="text-blue-100 text-sm font-medium">Growth Metrics</span>
                            </div>
                            <div className="text-2xl font-bold text-white flex items-center gap-1">
                                +<NumberTicker value={145} className="text-white" />%
                            </div>
                            <div className="text-xs text-blue-300">Client Revenue YoY</div>
                        </GlassCard>
                    </BlurFade>
                </div>
            </div>

            {/* Showreel Overlay */}
            <AnimatePresence>
                {showShowreel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
                        onClick={() => setShowShowreel(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-5xl"
                        >
                            <GlassCard className="p-8 bg-white/5 backdrop-blur-xl border border-white/10">
                                {/* Video Player */}
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-6">
                                    <video
                                        src="/showreel.mp4"
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain bg-black"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                {/* Back Button */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setShowShowreel(false)}
                                        className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 group"
                                    >
                                        <ArrowLeft className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
