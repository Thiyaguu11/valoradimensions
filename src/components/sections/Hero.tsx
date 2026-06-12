"use client";

import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import NumberTicker from "@/components/ui/NumberTicker";
import { BlurFade } from "@/components/ui/BlurFade";
import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern";
import { cn, scrollToSection } from "@/lib/utils";
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

const textLineContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.15,
        }
    }
};

const textLineVariants: Variants = {
    hidden: { y: "115%" },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 14,
            mass: 0.85,
        }
    }
};

export const Hero = () => {
    const [showShowreel, setShowShowreel] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
        >
            {/* Interactive Grid Pattern Background - Full Page */}
            <div className="absolute inset-0 z-0 bg-transparent">
                <div className="absolute inset-0 gaming-grid opacity-30" />
                <InteractiveGridPattern
                    className={cn(
                        "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                        "absolute inset-0 h-full w-full text-brand-cyan/10 stroke-brand-cyan/15"
                    )}
                />
                {isHovered && (
                    <div 
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 mix-blend-screen"
                        style={{
                            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 168, 232, 0.12), transparent 80%)`
                        }}
                    />
                )}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-deep-blue/20 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="container px-6 relative z-10 mx-auto max-w-7xl flex items-center justify-center min-h-[80vh]">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full transition-all duration-700 ease-in-out px-4">
                    {/* Left Column: Character Visual / Video Showreel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className={cn(
                            "z-30 shrink-0 w-full lg:w-auto",
                            showShowreel ? "flex" : "hidden lg:flex"
                        )}
                    >
                        <div className="flex flex-col items-start w-full">
                            {/* Section Branding Header with Doodles */}
                            <div className="flex flex-wrap items-center gap-4 mb-4 px-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_15px_rgba(0,168,232,0.8)]" />
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase italic font-sans text-gradient-cyan drop-shadow-[0_2px_8px_rgba(0,168,232,0.15)] pr-4">
                                        Valora Dimensions
                                    </h2>
                                </div>
                                
                                {/* Digital Marketing Cyber-Doodles */}
                                <div className="flex items-center gap-3.5 pl-3 border-l border-brand-cyan/20 text-brand-cyan/70">
                                    {/* Doodle 1: Megaphone/Speaker */}
                                    <svg className="w-5 h-5 animate-float-slow text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.5 8.5a4 4 0 0 1 0 7M19 6a8 8 0 0 1 0 12" strokeLinecap="round"/>
                                    </svg>
                                    {/* Doodle 2: Target/Bullseye */}
                                    <svg className="w-5 h-5 animate-float text-brand-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                    {/* Doodle 3: Rocket */}
                                    <svg className="w-5 h-5 animate-pulse text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 3.5s2-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6L18 4.5c-1.5-1.5-3.5-2.5-6-2.5zM9 15l6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {/* Doodle 4: Chart/Growth */}
                                    <svg className="w-5 h-5 animate-float-slow text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-0 w-full">
                                <GlassCard 
                                    variant="hud" 
                                    className={cn(
                                        "p-2 overflow-hidden relative group cursor-pointer transition-all duration-500 ease-in-out z-10",
                                        showShowreel 
                                            ? "w-[90vw] sm:w-[360px] aspect-[9/16] h-[600px] lg:h-[680px]" 
                                            : "w-[90vw] sm:w-[540px] lg:w-[660px] xl:w-[740px] aspect-video h-auto"
                                    )}
                                    onClick={() => {
                                        if (!showShowreel) setShowShowreel(true);
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        {!showShowreel ? (
                                            <motion.div
                                                key="character"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full h-full relative"
                                            >
                                                {/* Character video (converted from GIF for size) */}
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    aria-label="Valora Character Visual"
                                                    className="w-full h-full object-cover rounded-[14px] opacity-100 group-hover:scale-105 transition-transform duration-700"
                                                >
                                                    <source src="/creatives/1.webm" type="video/webm" />
                                                    <source src="/creatives/1.mp4" type="video/mp4" />
                                                </video>
                                                
                                                {/* HUD Top Overlay */}
                                                <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-brand-cyan/20">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                                                        <span className="text-[8px] font-mono text-brand-cyan tracking-wider font-bold">HOLO_SCAN ACTIVE</span>
                                                    </div>
                                                    <span className="text-[8px] font-mono text-brand-white/40">FEED_01</span>
                                                </div>

                                                {/* HUD Bottom Overlay */}
                                                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-brand-cyan/15 group-hover:border-brand-cyan/35 transition-colors flex items-center justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[7.5px] text-brand-yellow font-mono font-bold tracking-widest uppercase mb-1 flex items-center gap-1">
                                                            <span>🎰</span> SYSTEM MODULE // CHR_01
                                                        </div>
                                                        <div className="text-[10px] text-white font-mono font-bold uppercase tracking-wider truncate">Business Growth Partner</div>
                                                        <div className="text-[8px] text-brand-white/45 font-mono mt-1 flex items-center gap-3">
                                                            <span>SPEED: LV.99</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/35" />
                                                            <span>YIELD: 145%</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Inline Showreel Button */}
                                                    <div className="flex flex-col items-center justify-center pl-3.5 border-l border-brand-cyan/20 shrink-0 group/btn transition-colors hover:border-brand-cyan/50">
                                                        <div className="w-8 h-8 rounded-full bg-brand-orange/15 group-hover/btn:bg-brand-orange/25 border border-brand-orange/30 group-hover/btn:border-brand-orange/70 flex items-center justify-center transition-all duration-300 shadow-[0_0_8px_rgba(251,133,0,0.15)] group-hover/btn:shadow-[0_0_15px_rgba(251,133,0,0.4)]">
                                                            <PlayCircle className="w-4.5 h-4.5 text-brand-orange group-hover/btn:scale-110 transition-transform" />
                                                        </div>
                                                        <span className="text-[8px] font-mono font-black text-brand-white/90 uppercase tracking-widest mt-1.5 group-hover/btn:text-brand-orange transition-colors">
                                                            Showreel
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="showreel"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full h-full relative"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <video
                                                    src="/showreel.mp4"
                                                    autoPlay
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover rounded-[14px]"
                                                >
                                                    Your browser does not support the video tag.
                                                </video>

                                                {/* Close Button overlay */}
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                                                    <button
                                                        onClick={() => setShowShowreel(false)}
                                                        className="px-6 py-2.5 bg-brand-orange text-white text-[9px] font-black tracking-wider uppercase rounded-full hover:bg-brand-orange/90 transition-all font-mono shadow-[0_0_15px_rgba(251,133,0,0.4)] cursor-pointer"
                                                    >
                                                        Abort Feed
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>

                                {/* Active Multiplier - Below card, no overlap */}
                                <div className={cn(
                                    "w-full mt-5 transition-all duration-700",
                                    showShowreel ? "opacity-0 pointer-events-none h-0 mt-0 overflow-hidden" : "opacity-100"
                                )}>
                                    <BlurFade delay={0.6} duration={0.8} inView>
                                        <GlassCard variant="hud" className="w-full p-4 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-3 h-3 rounded-full bg-brand-green animate-ping shrink-0" />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-brand-cyan text-[11px] font-bold font-mono tracking-widest uppercase">Active Multiplier</span>
                                                        <span className="text-[9px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">LIVE</span>
                                                    </div>
                                                    <div className="text-[9px] text-brand-white/40 font-mono mt-0.5">Average Client Business Growth YoY</div>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-1 font-mono shrink-0">
                                                <span className="text-2xl font-black text-brand-white">+</span>
                                                <NumberTicker value={145} className="text-3xl font-black text-brand-white" />
                                                <span className="text-2xl font-black text-brand-orange">%</span>
                                            </div>
                                        </GlassCard>
                                    </BlurFade>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Main Hero Content Wrapper */}
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            x: 0,
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex items-center justify-center lg:justify-start max-w-md lg:max-w-[450px] w-full shrink-0"
                    >
                        <BlurFade delay={0.2} duration={0.8} inView>
                            <GlassCard
                                variant="hero"
                                className="p-6 md:p-8 w-full flex flex-col items-start justify-start text-left backdrop-filter backdrop-blur-3xl border border-brand-cyan/20 shadow-[0_0_50px_rgba(16,78,146,0.25)] bg-brand-deep-blue/5 relative z-10"
                            >
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-6 md:space-y-8 w-full"
                                >
                                    <motion.div variants={itemVariants} className="w-full text-left">
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase italic text-gradient-cyan pr-4 drop-shadow-[0_2px_8px_rgba(0,168,232,0.2)] font-sans">
                                            Valora Dimensions
                                        </h2>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="flex justify-start">
                                        <span className="px-4 py-1.5 rounded-full border border-brand-cyan/35 bg-brand-deep-blue/30 text-[10px] md:text-xs text-brand-cyan font-semibold tracking-wide uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,168,232,0.15)] flex items-center gap-2 font-mono">
                                            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> Welcome to the Next Dimension
                                        </span>
                                    </motion.div>

                                    <motion.h1
                                        variants={textLineContainerVariants}
                                        className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.15] uppercase italic font-sans flex flex-col items-start justify-start gap-1.5 md:gap-2.5 text-left"
                                    >
                                        <span className="block overflow-hidden py-1 pr-4">
                                            <motion.span variants={textLineVariants} className="block">
                                                WE ARE YOUR
                                            </motion.span>
                                        </span>
                                        <span className="block overflow-hidden py-1 pr-4">
                                            <motion.span 
                                                variants={textLineVariants} 
                                                className="block text-gradient-orange drop-shadow-[0_2px_8px_rgba(251,133,0,0.18)] px-1"
                                            >
                                                BUSINESS GROWTH
                                            </motion.span>
                                        </span>
                                        <span className="block overflow-hidden py-1 pr-4">
                                            <motion.span 
                                                variants={textLineVariants} 
                                                className="block text-gradient-cyan drop-shadow-[0_2px_8px_rgba(0,168,232,0.18)] px-1"
                                            >
                                                PARTNER.
                                            </motion.span>
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        variants={itemVariants}
                                        className="text-sm md:text-base text-brand-white/80 max-w-2xl leading-relaxed text-left font-medium"
                                    >
                                        We engineer high-performance acquisition pipelines and strategic marketing frameworks. As your dedicated Business Growth Partner, we align with your commercial outcomes to scale market share, accelerate pipeline velocity, and unlock predictable revenue.
                                    </motion.p>

                                    <motion.div
                                        variants={itemVariants}
                                        className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-2 w-full"
                                    >
                                        <Link
                                            href="#expertise"
                                            onClick={(e) => scrollToSection(e, "#expertise")}
                                            className="w-full sm:w-auto"
                                        >
                                            <button className="w-full sm:w-auto group relative px-8 py-4 bg-brand-orange text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,133,0,0.35)] hover:shadow-[0_0_30px_rgba(251,133,0,0.6)] border border-brand-orange/30 cursor-pointer">
                                                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider uppercase">
                                                    Start Campaign <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => setShowShowreel(prev => !prev)}
                                            className="w-full sm:w-auto px-8 py-4 bg-brand-deep-blue/20 text-white font-bold rounded-full border border-brand-cyan/35 hover:border-brand-cyan/80 hover:bg-brand-cyan/10 hover:shadow-[0_0_20px_rgba(0,168,232,0.25)] transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
                                        >
                                            <PlayCircle className="w-4 h-4 text-brand-cyan" />
                                            {showShowreel ? "Show Character" : "Watch Showreel"}
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </GlassCard>
                        </BlurFade>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};
