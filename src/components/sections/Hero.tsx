"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
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
            staggerChildren: 0.14,
            delayChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
};

const textLineContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
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

const heroStats = [
    { label: "Clients Worldwide", value: 10, suffix: "+", color: "text-brand-cyan" },
    { label: "Campaigns Launched", value: 500, suffix: "+", color: "text-brand-orange" },
    { label: "Leads Generated", value: 6000, suffix: "+", color: "text-brand-green" },
];

export const Hero = () => {
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
            className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
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
                {/* Drifting ambient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-deep-blue/20 blur-[150px] rounded-full pointer-events-none animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none animate-float" />
                <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-brand-orange/8 blur-[140px] rounded-full pointer-events-none animate-float-slow" />
            </div>

            <div className="container px-6 relative z-10 mx-auto max-w-7xl flex items-center justify-center min-h-[80vh]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-7"
                >
                    {/* ── Brand Header with floating cyber-doodles ── */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_15px_rgba(0,168,232,0.8)]" />
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase italic font-sans text-gradient-cyan drop-shadow-[0_2px_8px_rgba(0,168,232,0.15)]">
                                Valora Dimensions
                            </h2>
                        </div>

                        {/* Digital Marketing Cyber-Doodles */}
                        <div className="flex items-center gap-3.5 pl-3 border-l border-brand-cyan/20 text-brand-cyan/70">
                            {/* Megaphone */}
                            <svg className="w-5 h-5 animate-float-slow text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.5 8.5a4 4 0 0 1 0 7M19 6a8 8 0 0 1 0 12" strokeLinecap="round" />
                            </svg>
                            {/* Target */}
                            <svg className="w-5 h-5 animate-float text-brand-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                            {/* Rocket */}
                            <svg className="w-5 h-5 animate-float-slow text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 3.5s2-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6L18 4.5c-1.5-1.5-3.5-2.5-6-2.5zM9 15l6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {/* Chart */}
                            <svg className="w-5 h-5 animate-float text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* ── Live Badge ── */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <span className="px-4 py-1.5 rounded-full border border-brand-cyan/35 bg-brand-deep-blue/30 text-[10px] sm:text-xs text-brand-cyan font-semibold tracking-wide uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,168,232,0.15)] flex items-center gap-2 font-mono">
                            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> Welcome to the Next Dimension
                        </span>
                    </motion.div>

                    {/* ── Animated Headline ── */}
                    <motion.h1
                        variants={textLineContainerVariants}
                        className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] uppercase italic font-sans flex flex-col items-center gap-1.5"
                    >
                        <span className="block overflow-hidden py-1">
                            <motion.span variants={textLineVariants} className="block">
                                WE ARE YOUR
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                            <motion.span
                                variants={textLineVariants}
                                className="block text-gradient-orange drop-shadow-[0_2px_8px_rgba(251,133,0,0.18)] px-1"
                            >
                                BUSINESS GROWTH
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                            <motion.span
                                variants={textLineVariants}
                                className="block text-gradient-cyan drop-shadow-[0_2px_8px_rgba(0,168,232,0.18)] px-1"
                            >
                                PARTNER.
                            </motion.span>
                        </span>
                    </motion.h1>

                    {/* ── Description ── */}
                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base text-brand-white/80 max-w-xl leading-relaxed font-medium"
                    >
                        We engineer high-performance acquisition pipelines and strategic marketing frameworks. As your dedicated Business Growth Partner, we align with your commercial outcomes to scale market share, accelerate pipeline velocity, and unlock predictable revenue.
                    </motion.p>

                    {/* ── CTAs ── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-1"
                    >
                        <Link
                            href="#contact"
                            onClick={(e) => scrollToSection(e, "#contact")}
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full sm:w-auto group relative px-8 py-4 bg-brand-orange text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,133,0,0.35)] hover:shadow-[0_0_30px_rgba(251,133,0,0.6)] border border-brand-orange/30 cursor-pointer">
                                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider uppercase">
                                    Start Campaign <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>
                        </Link>
                        <Link
                            href="#brandfolio"
                            onClick={(e) => scrollToSection(e, "#brandfolio")}
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full sm:w-auto px-8 py-4 bg-brand-deep-blue/20 text-white font-bold rounded-full border border-brand-cyan/35 hover:border-brand-cyan/80 hover:bg-brand-cyan/10 hover:shadow-[0_0_20px_rgba(0,168,232,0.25)] transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer">
                                <Compass className="w-4 h-4 text-brand-cyan" />
                                <span className="tracking-wider uppercase">View Brandfolio</span>
                            </button>
                        </Link>
                    </motion.div>

                    {/* ── Active Multiplier (HUD) ── */}
                    <motion.div variants={itemVariants} className="w-full pt-3">
                        <GlassCard variant="hud" className="w-full p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brand-green animate-ping shrink-0" />
                                <div className="text-left">
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
                    </motion.div>

                    {/* ── Mini Stats Strip ── */}
                    <BlurFade delay={0.7} duration={0.8} inView className="w-full">
                        <div className="grid grid-cols-3 gap-3 w-full">
                            {heroStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl bg-[#08111e]/60 border border-brand-cyan/15 hover:border-brand-cyan/35 transition-colors p-3 text-center backdrop-blur-md"
                                >
                                    <div className={`${stat.color} text-xl sm:text-2xl font-black font-mono whitespace-nowrap`}>
                                        <NumberTicker value={stat.value} className={stat.color} />{stat.suffix}
                                    </div>
                                    <div className="text-[8px] text-brand-white/45 font-mono uppercase tracking-widest mt-1 leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BlurFade>
                </motion.div>
            </div>
        </section>
    );
};
