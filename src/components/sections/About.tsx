"use client";

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
                        <p className="text-brand-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                            We are Valora Dimensions — a next-generation AI marketing &amp; automation agency built to accelerate business growth at scale.
                        </p>
                    </div>
                </BlurFade>

                {/* ── ROW 1: 3-COL BENTO — TEXT · GIF PANEL · SIDEBAR ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                    {/* ── Col A: Main Statement (5/12) ── */}
                    <BlurFade delay={0.15} inView className="lg:col-span-5">
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
                            </div>
                        </GlassCard>
                    </BlurFade>

                    {/* ── Col B: Compact GIF Panel (4/12) ── */}
                    <BlurFade delay={0.25} inView className="lg:col-span-4">
                        <GlassCard className="bg-brand-deep-blue/5 border-brand-cyan/15 overflow-hidden relative group p-2.5 hover:border-brand-cyan/35 transition-all duration-500 shadow-[0_4px_40px_rgba(0,0,0,0.45)]">
                            {/* HUD Top Bar */}
                            <div className="flex items-center justify-between mb-2 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                                    <span className="text-[8px] font-mono text-brand-cyan tracking-wider font-bold">VALORA_GROWTH_ENGINE</span>
                                </div>
                                <span className="text-[8px] font-mono text-brand-white/40">v2.0 ACTIVE</span>
                            </div>

                            {/* GIF — compact fixed height */}
                            <div className="relative w-full h-[260px] rounded-xl overflow-hidden">
                                <video
                                    src="/creatives/3.mp4"
                                    aria-label="Valora Dimensions AI Growth Partner"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                />
                                {/* Gradient fade bottom */}
                                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-black/80 to-transparent pointer-events-none" />
                            </div>

                            {/* HUD Footer */}
                            <div className="mt-2 px-1 flex items-center justify-between">
                                <div>
                                    <div className="text-[7px] text-brand-yellow font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                                        <BarChart3 className="w-2.5 h-2.5" /> AI MARKETING PARTNER
                                    </div>
                                    <div className="text-[9px] text-white font-mono font-bold uppercase tracking-wider mt-0.5">Growth Intelligence Unit</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-brand-green text-base font-black font-mono">+145%</div>
                                    <div className="text-[7px] text-brand-white/40 font-mono">Avg. Growth</div>
                                </div>
                            </div>
                        </GlassCard>
                    </BlurFade>

                    {/* ── Col C: Sidebar — Vision · Mission · Live Stat (3/12) ── */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        {/* Vision */}
                        <BlurFade delay={0.3} inView>
                            <GlassCard className="p-5 bg-brand-deep-blue/5 border-brand-cyan/20 hover:border-brand-cyan/40 transition-all duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-brand-cyan shrink-0" />
                                    <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-widest">Vision</span>
                                </div>
                                <p className="text-brand-white/75 text-sm leading-snug font-medium">
                                    To be the most trusted growth partner for ambitious brands worldwide.
                                </p>
                            </GlassCard>
                        </BlurFade>

                        {/* Mission */}
                        <BlurFade delay={0.38} inView>
                            <GlassCard className="p-5 bg-brand-deep-blue/5 border-brand-orange/20 hover:border-brand-orange/40 transition-all duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                    <Rocket className="w-4 h-4 text-brand-orange shrink-0" />
                                    <span className="text-brand-orange text-[10px] font-mono font-bold uppercase tracking-widest">Mission</span>
                                </div>
                                <p className="text-brand-white/75 text-sm leading-snug font-medium">
                                    Deliver AI-driven systems that turn marketing spend into measurable revenue.
                                </p>
                            </GlassCard>
                        </BlurFade>

                        {/* Live Stat */}
                        <BlurFade delay={0.46} inView>
                            <GlassCard variant="hud" className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-brand-green animate-ping shrink-0" />
                                    <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-widest">Active Multiplier</span>
                                    <span className="ml-auto text-[8px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">LIVE</span>
                                </div>
                                <div className="flex items-baseline gap-1 font-mono">
                                    <span className="text-3xl font-black text-brand-white">+</span>
                                    <NumberTicker value={145} className="text-3xl font-black text-brand-white" />
                                    <span className="text-2xl font-black text-brand-orange">%</span>
                                </div>
                                <div className="text-[9px] text-brand-white/40 font-mono mt-1">Average Client Business Growth YoY</div>
                            </GlassCard>
                        </BlurFade>
                    </div>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={p.label}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard
                                    className="p-7 h-full bg-brand-deep-blue/5 border-brand-cyan/12 hover:border-brand-cyan/30 transition-all duration-500 group flex flex-col gap-4"
                                    style={{ boxShadow: `0 0 0 0 ${p.glow}` }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: `${p.glow}`,
                                            borderColor: `${p.glow}`.replace("0.15", "0.35"),
                                        }}
                                    >
                                        <p.icon className={`w-5 h-5 ${p.accent}`} />
                                    </div>
                                    <div>
                                        <h4 className={`${p.accent} font-black text-sm uppercase tracking-wider font-mono mb-2`}>
                                            {p.label}
                                        </h4>
                                        <p className="text-brand-white/60 text-sm leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
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
