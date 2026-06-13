"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import NumberTicker from "@/components/ui/NumberTicker";
import { BlurFade } from "@/components/ui/BlurFade";
import {
    Zap,
    Target,
    Rocket,
    TrendingUp,
    Bot,
    BarChart3,
    Globe,
    Sparkles,
} from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};



const pillars = [
    {
        icon: Bot,
        label: "AI Marketing",
        desc: "We deploy AI-powered ad intelligence to identify winning creatives and audiences — 10x faster than manual testing.",
        accent: "text-brand-cyan",
        glow: "rgba(0,168,232,0.15)",
    },
    {
        icon: TrendingUp,
        label: "Revenue Pipeline",
        desc: "Every strategy is built around your revenue goals — from awareness to conversion, we engineer the full pipeline.",
        accent: "text-brand-orange",
        glow: "rgba(251,133,0,0.15)",
    },
    {
        icon: Globe,
        label: "Global Reach",
        desc: "Multi-market campaigns across Meta, Google, and LinkedIn — executed with regional precision and cultural intelligence.",
        accent: "text-brand-green",
        glow: "rgba(72,199,142,0.15)",
    },
    {
        icon: Sparkles,
        label: "Growth Automation",
        desc: "CRM workflows, lead nurturing sequences, and performance dashboards — all automated so you scale without scaling headcount.",
        accent: "text-brand-yellow",
        glow: "rgba(255,221,87,0.15)",
    },
];

const stats = [
    { label: "Clients Worldwide", value: 10, suffix: "+", color: "text-brand-cyan" },
    { label: "Campaigns Launched", value: 500, suffix: "+", color: "text-brand-orange" },
    { label: "Leads Generated", value: 6000, suffix: "+", color: "text-brand-green" },
    { label: "Average Growth", value: 3, suffix: "X", color: "text-brand-yellow" },
];

export const About = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentPillarSlide, setCurrentPillarSlide] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;

        if (diffX > 50) {
            setCurrentPillarSlide(1);
        } else if (diffX < -50) {
            setCurrentPillarSlide(0);
        }
        setTouchStartX(null);
    };

    return (
        <section id="about" className="py-32 relative text-white overflow-hidden bg-transparent">
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-deep-blue/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-brand-cyan/8 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">

                {/* ── SECTION HEADER ── */}
                <BlurFade delay={0.05} inView>
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-12 bg-brand-cyan/40" />
                            <span className="text-brand-cyan text-xs font-mono font-bold uppercase tracking-[0.25em]">Our Story</span>
                            <span className="h-px w-12 bg-brand-cyan/40" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase drop-shadow-[0_0_20px_rgba(0,168,232,0.12)]">
                            About Us
                        </h2>
                    </div>
                </BlurFade>

                {/* ── ROW 1: BENTO VIEWPORTS ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                    {/* ── Col A: Main Statement with 3D Flip (Full Width) ── */}
                    <BlurFade delay={0.15} inView className="lg:col-span-12 w-full">
                        <div className="flip-card-container">
                            <div 
                                className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {/* Front Side */}
                                <div className="flip-card-front">
                                    <GlassCard className="p-8 md:p-10 h-full flex flex-col justify-between bg-brand-deep-blue/5 border-brand-cyan/15 group overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-60 h-60 bg-brand-cyan/6 blur-[120px] rounded-full pointer-events-none" />
                                        <div className="relative z-10 space-y-6">
                                            <div className="space-y-2">
                                                <span className="text-brand-orange text-[10px] font-mono font-bold uppercase tracking-[0.22em] flex items-center gap-2">
                                                    <Zap className="w-3 h-3" /> Business Growth Partner
                                                </span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
                                                    We don&apos;t run ads.
                                                    <br />
                                                    <span className="text-gradient-cyan">We engineer</span>
                                                    <br />
                                                    <span className="text-gradient-orange">your growth.</span>
                                                </h3>
                                            </div>

                                            <div className="space-y-3 text-brand-white/65 text-sm md:text-base leading-relaxed">
                                                <p>
                                                    Valora Dimensions is an AI-powered marketing &amp; automation agency built to deliver predictable, scalable revenue pipelines — not vanity metrics.
                                                </p>
                                                <p>
                                                    We combine brand strategy with cutting-edge AI tools to deliver results{" "}
                                                    <span className="text-brand-cyan font-semibold">10x faster</span>{" "}
                                                    than traditional agencies — zero fluff, full transparency.
                                                </p>
                                            </div>

                                            <div className="pt-2 flex items-center gap-2 text-[9px] text-brand-cyan/50 font-mono font-bold tracking-widest uppercase animate-pulse">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                                                Click panel to view Vision & Mission
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Back Side */}
                                <div className="flip-card-back">
                                    <GlassCard className="p-8 md:p-10 h-full flex flex-col justify-between bg-brand-deep-blue/5 border-brand-orange/25 group overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-60 h-60 bg-brand-orange/6 blur-[120px] rounded-full pointer-events-none" />
                                        <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                                    <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-[0.22em] flex items-center gap-2">
                                                        <Target className="w-3.5 h-3.5" /> Corporate Directives
                                                    </span>
                                                    <span className="text-[8px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-mono font-bold">ACTIVE</span>
                                                </div>

                                                {/* Vision */}
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-brand-cyan shrink-0" />
                                                        <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-widest">Vision</span>
                                                    </div>
                                                    <p className="text-brand-white/85 text-sm leading-snug font-medium">
                                                        To be the most trusted growth partner for ambitious brands worldwide.
                                                    </p>
                                                </div>

                                                {/* Mission */}
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Rocket className="w-4 h-4 text-brand-orange shrink-0" />
                                                        <span className="text-brand-orange text-[10px] font-mono font-bold uppercase tracking-widest">Mission</span>
                                                    </div>
                                                    <p className="text-brand-white/85 text-sm leading-snug font-medium">
                                                        Deliver AI-driven systems that turn marketing spend into measurable revenue.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Active Multiplier */}
                                            <div className="pt-4 border-t border-white/5 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-brand-green animate-ping shrink-0" />
                                                    <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-widest">Active Multiplier</span>
                                                    <span className="ml-auto text-[8px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">LIVE</span>
                                                </div>
                                                <div className="flex items-baseline gap-1 font-mono">
                                                    <span className="text-3xl font-black text-brand-white">+</span>
                                                    <NumberTicker value={145} className="text-3xl font-black text-brand-white" />
                                                    <span className="text-2xl font-black text-brand-orange">%</span>
                                                    <span className="ml-3 text-[10px] text-brand-white/50 leading-tight font-medium font-sans">
                                                        Average Client YoY Growth
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[9px] text-brand-orange/50 font-mono font-bold tracking-widest uppercase">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                                                Click card to return
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>

                {/* ── ROW 2: AI MARKETING PILLARS ── */}
                <div className="space-y-8">
                    <BlurFade delay={0.05} inView>
                        <div className="flex items-center gap-4">
                            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
                            <span className="text-brand-cyan text-xs font-mono font-bold uppercase tracking-[0.25em] shrink-0 flex items-center gap-2">
                                <Bot className="w-3.5 h-3.5" /> How We Drive Growth
                            </span>
                            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
                        </div>
                    </BlurFade>

                    <div 
                        className="relative w-full overflow-hidden px-1 py-4"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div 
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentPillarSlide * 100}%)` }}
                        >
                            {/* Slide 1 (Left 2) */}
                            <div className="w-full shrink-0 flex flex-col gap-4 px-2">
                                {pillars.slice(0, 2).map((p) => (
                                    <GlassCard
                                        key={p.label}
                                        className="p-6 bg-[#08111e]/40 border-brand-cyan/15 hover:border-brand-cyan/30 transition-all duration-300 flex items-start gap-4"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-brand-deep-blue/10 border-brand-cyan/20"
                                        >
                                            <p.icon className={`w-4 h-4 ${p.accent}`} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className={`${p.accent} font-black text-xs uppercase tracking-wider font-mono`}>
                                                {p.label}
                                            </h4>
                                            <p className="text-brand-white/70 text-xs leading-relaxed font-medium">
                                                {p.desc}
                                            </p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>

                            {/* Slide 2 (Right 2) */}
                            <div className="w-full shrink-0 flex flex-col gap-4 px-2">
                                {pillars.slice(2, 4).map((p) => (
                                    <GlassCard
                                        key={p.label}
                                        className="p-6 bg-[#08111e]/40 border-brand-cyan/15 hover:border-brand-cyan/30 transition-all duration-300 flex items-start gap-4"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-brand-deep-blue/10 border-brand-cyan/20"
                                        >
                                            <p.icon className={`w-4 h-4 ${p.accent}`} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className={`${p.accent} font-black text-xs uppercase tracking-wider font-mono`}>
                                                {p.label}
                                            </h4>
                                            <p className="text-brand-white/70 text-xs leading-relaxed font-medium">
                                                {p.desc}
                                            </p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Swiper Controls */}
                        <div className="flex justify-center items-center gap-3 mt-4">
                            <button
                                onClick={() => setCurrentPillarSlide(0)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${currentPillarSlide === 0 ? "bg-brand-cyan w-6" : "bg-neutral-600 hover:bg-neutral-500"}`}
                                aria-label="Go to slide 1"
                            />
                            <button
                                onClick={() => setCurrentPillarSlide(1)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${currentPillarSlide === 1 ? "bg-brand-cyan w-6" : "bg-neutral-600 hover:bg-neutral-500"}`}
                                aria-label="Go to slide 2"
                            />
                        </div>
                    </div>
                </div>



                {/* ── ROW 4: AI STATEMENT BANNER ── */}
                <BlurFade delay={0.1} inView>
                    <div className="rounded-[2rem] overflow-hidden border border-brand-cyan/20 bg-brand-deep-blue/5 shadow-[0_10px_50px_rgba(0,0,0,0.5)] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-transparent to-brand-orange/5 pointer-events-none" />
                        <div className="absolute inset-0 gaming-grid opacity-20 pointer-events-none" />
                        <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            <div className="flex-1 space-y-4">
                                <div className="text-brand-cyan text-xs font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5 text-brand-orange" /> AI-Powered by Design
                                </div>
                                <h4 className="text-2xl md:text-4xl font-black text-white leading-[1.15] tracking-tighter uppercase italic">
                                    We run at{" "}
                                    <span className="text-gradient-orange">10x the speed</span>{" "}
                                    of a traditional agency —{" "}
                                    <span className="text-gradient-cyan">with zero compromise</span>{" "}
                                    on quality.
                                </h4>
                                <p className="text-brand-white/60 text-base leading-relaxed max-w-xl">
                                    Through AI creative testing, automated audience segmentation, and real-time performance analytics, we compress what takes months into weeks — and weeks into days.
                                </p>
                            </div>
                            {/* Mini metric tiles */}
                            <div className="grid grid-cols-2 gap-4 shrink-0 w-full md:w-auto">
                                {[
                                    { label: "Faster Testing", value: "10x", color: "text-brand-cyan" },
                                    { label: "Ad Channels", value: "4+", color: "text-brand-orange" },
                                    { label: "Automation Rate", value: "60%", color: "text-brand-green" },
                                    { label: "Pipeline Stages", value: "Full", color: "text-brand-yellow" },
                                ].map((tile) => (
                                    <div key={tile.label} className="p-4 rounded-xl bg-brand-black/40 border border-brand-cyan/10 text-center min-w-[110px]">
                                        <div className={`${tile.color} text-2xl font-black font-mono`}>{tile.value}</div>
                                        <div className="text-[9px] text-brand-white/40 font-mono uppercase tracking-widest mt-1">{tile.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </BlurFade>

                {/* ── ROW 5: STATS ── */}
                <BlurFade delay={0.1} inView>
                    <GlassCard className="p-10 md:p-16 bg-brand-deep-blue/10 border-brand-cyan/20 shadow-[0_12px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/8 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="text-center mb-10">
                                <span className="text-brand-white/40 text-xs font-mono font-bold uppercase tracking-[0.25em]">Valora by the Numbers</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className={`${stat.color} text-4xl md:text-6xl font-black mb-2 drop-shadow-[0_0_12px_rgba(0,168,232,0.18)] font-mono whitespace-nowrap`}>
                                            <NumberTicker value={stat.value} className={stat.color} />{stat.suffix}
                                        </div>
                                        <div className="text-[10px] md:text-xs text-brand-white/45 uppercase tracking-[0.2em] font-bold font-mono">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </BlurFade>

            </div>
        </section>
    );
};
