"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { cn, scrollToSection } from "@/lib/utils";
import {
    Monitor,
    Search,
    Users,
    LayoutGrid,
    ArrowRight,
    ChevronDown,
    Building2,
    ShoppingBag,
    CheckCircle2,
} from "lucide-react";

/* ─── SERVICE DATA ────────────────────────────────────────────── */
const services = [
    {
        id: "webdev",
        num: "01",
        icon: Monitor,
        title: "Website Development",
        tagline: "Built to Convert.",
        description:
            "We craft fast, conversion-first websites that make a statement. From landing pages to full-scale platforms — clean code, sharp design, zero compromise.",
        accent: "brand-cyan",
        gradient: "from-brand-cyan/10 via-transparent to-transparent",
        border: "border-brand-cyan/25",
        activeBorder: "border-brand-cyan/60",
        highlights: [
            "Lightning-fast load speeds",
            "Mobile-first, pixel-perfect UI",
            "Built for leads & conversions",
            "SEO-ready architecture",
        ],
        tags: ["Next.js", "React", "Tailwind", "CRO"],
    },
    {
        id: "googleads",
        num: "02",
        icon: Search,
        title: "Google Ads",
        tagline: "Pay for Results.",
        description:
            "We run precision Google Search, Display & Performance Max campaigns — targeting the exact moment your customer is ready to buy.",
        accent: "brand-orange",
        gradient: "from-brand-orange/10 via-transparent to-transparent",
        border: "border-brand-orange/25",
        activeBorder: "border-brand-orange/60",
        highlights: [
            "High-intent keyword targeting",
            "Smart bidding & budget control",
            "Weekly performance reports",
            "Retargeting & remarketing",
        ],
        tags: ["Search Ads", "Performance Max", "Display", "YouTube"],
    },
    {
        id: "leadgen",
        num: "03",
        icon: Users,
        title: "Lead Generation",
        tagline: "Leads That Buy.",
        description:
            "We build full-funnel lead pipelines across Meta & Google — B2B or B2C. Every lead is tracked, qualified, and delivered straight to your CRM.",
        accent: "brand-green",
        gradient: "from-brand-green/10 via-transparent to-transparent",
        border: "border-brand-green/25",
        activeBorder: "border-brand-green/60",
        highlights: [],
        tags: ["Meta Ads", "Google Ads", "CRM Integration", "Automation"],
        subServices: [
            {
                id: "b2b",
                icon: Building2,
                label: "B2B",
                title: "Business-to-Business",
                desc: "We generate high-value decision-maker leads — LinkedIn, Google, and Meta campaigns targeted at founders, directors, and procurement heads.",
                color: "text-brand-cyan",
                border: "border-brand-cyan/20",
                bg: "bg-brand-cyan/5",
            },
            {
                id: "b2c",
                icon: ShoppingBag,
                label: "B2C",
                title: "Business-to-Consumer",
                desc: "We run mass-reach, cost-efficient campaigns to pull consumers into your pipeline — real estate, education, finance, and more.",
                color: "text-brand-orange",
                border: "border-brand-orange/20",
                bg: "bg-brand-orange/5",
            },
        ],
    },
    {
        id: "smm",
        num: "04",
        icon: LayoutGrid,
        title: "Social Media Management",
        tagline: "Real Engagement.",
        description:
            "We handle your content calendar, creative production, and community — so your brand stays visible, relevant, and growing every single day.",
        accent: "brand-yellow",
        gradient: "from-brand-yellow/10 via-transparent to-transparent",
        border: "border-brand-yellow/25",
        activeBorder: "border-brand-yellow/60",
        highlights: [
            "Monthly content calendars",
            "Branded creatives & reels",
            "Community management",
            "Growth analytics dashboard",
        ],
        tags: ["Instagram", "Facebook", "LinkedIn", "YouTube"],
    },
];

/* ─── COMPONENT ───────────────────────────────────────────────── */
export const Expertise = () => {
    const [activeId, setActiveId] = useState("webdev");

    const active = services.find((s) => s.id === activeId) ?? services[0];

    return (
        <section
            id="expertise"
            className="py-28 relative overflow-hidden bg-transparent text-white"
        >
            {/* Ambient glows */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-deep-blue/15 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">

                {/* ── HEADER ── */}
                <BlurFade delay={0.05} inView>
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="h-px w-10 bg-brand-orange/50" />
                            <span className="text-brand-orange text-[10px] font-mono font-bold uppercase tracking-[0.3em]">What We Do</span>
                            <span className="h-px w-10 bg-brand-orange/50" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white drop-shadow-[0_0_20px_rgba(0,168,232,0.1)]">
                            Our Services
                        </h2>
                        <p className="text-brand-white/50 text-base max-w-xl mx-auto leading-relaxed">
                            Four focused services. One goal — to grow your business.
                        </p>
                    </div>
                </BlurFade>

                {/* ── MAIN PANEL ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                    {/* LEFT: Service Selector Panel */}
                    <div className="lg:col-span-4">
                        <BlurFade delay={0.1} inView>
                            <div className="p-3.5 rounded-[2rem] bg-[#070d19]/90 border border-brand-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] relative overflow-hidden flex flex-col gap-2.5">
                                {/* Ambient decorative background highlights inside the panel */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_70%_20%,rgba(0,168,232,0.15),transparent_70%)]" />

                                {services.map((svc) => {
                                    const Icon = svc.icon;
                                    const isActive = activeId === svc.id;
                                    return (
                                        <button
                                            key={svc.id}
                                            onClick={() => setActiveId(svc.id)}
                                            className="w-full text-left group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer px-5 py-4 flex items-center gap-4 focus:outline-none"
                                        >
                                            {/* Sliding Active Pill */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeServicePill"
                                                    className="absolute inset-0 bg-[#0c1527] border border-brand-white/10 rounded-xl pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                />
                                            )}

                                            {/* Sliding left indicator color bar */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeServiceBar"
                                                    className={cn(
                                                        "absolute left-0 top-3.5 bottom-3.5 w-1 rounded-r-md pointer-events-none",
                                                        svc.id === "webdev" && "bg-brand-cyan",
                                                        svc.id === "googleads" && "bg-brand-orange",
                                                        svc.id === "leadgen" && "bg-brand-green",
                                                        svc.id === "smm" && "bg-brand-yellow"
                                                    )}
                                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                />
                                            )}

                                            {/* Icon */}
                                            <div className={cn(
                                                "relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 border",
                                                isActive
                                                    ? "bg-[#060b14]/80 border-brand-white/10"
                                                    : "bg-transparent border-transparent"
                                            )}>
                                                <Icon className={cn(
                                                    "w-4.5 h-4.5 transition-all duration-300",
                                                    isActive
                                                        ? (svc.id === "webdev" && "text-brand-cyan drop-shadow-[0_0_8px_rgba(0,168,232,0.45)]") ||
                                                          (svc.id === "googleads" && "text-brand-orange drop-shadow-[0_0_8px_rgba(251,133,0,0.45)]") ||
                                                          (svc.id === "leadgen" && "text-brand-green drop-shadow-[0_0_8px_rgba(72,199,142,0.45)]") ||
                                                          (svc.id === "smm" && "text-brand-yellow drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]")
                                                        : "text-brand-white/35 group-hover:text-brand-white/60"
                                                )} />
                                            </div>

                                            {/* Label */}
                                            <div className="relative z-10 flex-1 min-w-0">
                                                <div className={cn(
                                                    "text-[8.5px] font-mono font-bold uppercase tracking-[0.22em] mb-0.5 transition-colors",
                                                    isActive
                                                        ? (svc.id === "webdev" && "text-brand-cyan") ||
                                                          (svc.id === "googleads" && "text-brand-orange") ||
                                                          (svc.id === "leadgen" && "text-brand-green") ||
                                                          (svc.id === "smm" && "text-brand-yellow")
                                                        : "text-brand-white/25 group-hover:text-brand-white/40"
                                                )}>
                                                    {svc.num} — SERVICE
                                                </div>
                                                <div className={cn(
                                                    "font-bold text-xs uppercase tracking-wider transition-colors leading-tight",
                                                    isActive ? "text-white font-black" : "text-brand-white/55 group-hover:text-brand-white/80"
                                                )}>
                                                    {svc.title}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <ArrowRight className={cn(
                                                "relative z-10 w-3.5 h-3.5 shrink-0 transition-all duration-300",
                                                isActive
                                                    ? (svc.id === "webdev" && "text-brand-cyan") ||
                                                      (svc.id === "googleads" && "text-brand-orange") ||
                                                      (svc.id === "leadgen" && "text-brand-green") ||
                                                      (svc.id === "smm" && "text-brand-yellow")
                                                    : "text-brand-white/15 group-hover:text-brand-white/35 group-hover:translate-x-0.5"
                                            )} />
                                        </button>
                                    );
                                })}

                                {/* Divider */}
                                <div className="h-px bg-brand-white/10 my-2" />

                                {/* Pop CTA Button */}
                                <Link
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, "#contact")}
                                    className="w-full mt-1"
                                >
                                    <button className="w-full group relative py-3.5 bg-gradient-to-r from-brand-orange to-brand-yellow hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-[0_0_20px_rgba(251,133,0,0.3)] hover:shadow-[0_0_35px_rgba(251,133,0,0.55)] border border-brand-orange/30 cursor-pointer flex items-center justify-center gap-2">
                                        <span>Start Campaign</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </BlurFade>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.38, ease: "easeOut" }}
                            >
                                <GlassCard className={cn(
                                    "p-8 md:p-10 relative overflow-hidden border",
                                    active.border,
                                    "bg-brand-deep-blue/5"
                                )}>
                                    {/* Gradient accent top-right */}
                                    <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${active.gradient} pointer-events-none blur-2xl`} />

                                    <div className="relative z-10 space-y-8">

                                        {/* Heading block */}
                                        <div className="space-y-3">
                                            <div className={`text-${active.accent} text-[9px] font-mono font-bold uppercase tracking-[0.28em] flex items-center gap-2`}>
                                                <span className={`w-1.5 h-1.5 rounded-full bg-${active.accent} animate-pulse`} />
                                                {active.num} — {active.title}
                                            </div>
                                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] italic uppercase">
                                                {active.tagline}
                                            </h3>
                                            <p className="text-brand-white/75 text-lg md:text-xl leading-relaxed max-w-3xl">
                                                {active.description}
                                            </p>
                                        </div>

                                        {/* B2B / B2C sub-cards (Lead Gen only) */}
                                        {active.subServices && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {active.subServices.map((sub) => {
                                                    const SubIcon = sub.icon;
                                                    return (
                                                        <div key={sub.id} className={`p-6 rounded-[1.75rem] border ${sub.border} ${sub.bg} space-y-4`}>
                                                            <div className="flex items-center gap-3.5">
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub.bg} border ${sub.border}`}>
                                                                    <SubIcon className={`w-5 h-5 ${sub.color}`} />
                                                                </div>
                                                                <div>
                                                                    <div className={`text-[9.5px] font-mono font-bold uppercase tracking-widest ${sub.color}`}>{sub.label}</div>
                                                                    <div className="text-white text-sm md:text-base font-black uppercase tracking-tight">{sub.title}</div>
                                                                </div>
                                                            </div>
                                                            <p className="text-brand-white/70 text-base leading-relaxed">{sub.desc}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Highlights (non-lead gen) */}
                                        {active.highlights.length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                                {active.highlights.map((h) => (
                                                    <div key={h} className="flex items-center gap-3">
                                                        <CheckCircle2 className={`w-5 h-5 text-${active.accent} shrink-0`} />
                                                        <span className="text-brand-white/85 text-base md:text-lg font-semibold">{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Divider */}
                                        <div className={`h-px bg-gradient-to-r from-transparent via-${active.accent}/30 to-transparent`} />

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2.5 items-center">
                                            <span className="text-[10px] text-brand-white/45 font-mono uppercase tracking-widest mr-1.5">Channels</span>
                                            {active.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-4 py-1.5 rounded-full border ${active.border} bg-brand-deep-blue/20 text-xs font-mono font-bold text-brand-white/80 uppercase tracking-wider`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
