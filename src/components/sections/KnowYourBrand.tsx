"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { scrollToSection } from "@/lib/utils";
import {
    Monitor,
    Search,
    Users,
    LayoutGrid,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Sparkles,
    ChevronRight,
    RotateCcw,
} from "lucide-react";

/* ─── QUESTIONS ───────────────────────────────────────────────── */
const questions = [
    {
        id: 1,
        q: "Do you have a website that represents your brand and converts visitors into leads?",
        service: "webdev",
        yesOk: true, // if YES → no issue; if NO → recommend
    },
    {
        id: 2,
        q: "Are you generating a consistent stream of new business inquiries or leads every month?",
        service: "leadgen",
        yesOk: true,
    },
    {
        id: 3,
        q: "Are you actively running Google Ads to capture high-intent search traffic?",
        service: "googleads",
        yesOk: true,
    },
    {
        id: 4,
        q: "Do you have an active social media presence that engages your audience daily?",
        service: "smm",
        yesOk: true,
    },
    {
        id: 5,
        q: "Does your current website feel outdated or failing to keep up with competitors?",
        service: "webdev",
        yesOk: false, // if YES → problem exists
    },
    {
        id: 6,
        q: "Are you looking for an automated system to handle lead generation & sales outreach?",
        service: "leadgen",
        yesOk: false,
    },
];

/* ─── SERVICE MAP ─────────────────────────────────────────────── */
const serviceMap: Record<string, {
    label: string;
    icon: React.ReactNode;
    accent: string;
    border: string;
    bg: string;
    pitch: string;
}> = {
    webdev: {
        label: "Website Development",
        icon: <Monitor className="w-5 h-5" />,
        accent: "text-brand-cyan",
        border: "border-brand-cyan/35",
        bg: "bg-brand-cyan/8",
        pitch: "You need a modern, high-converting digital storefront that works 24/7.",
    },
    googleads: {
        label: "Google Ads",
        icon: <Search className="w-5 h-5" />,
        accent: "text-brand-orange",
        border: "border-brand-orange/35",
        bg: "bg-brand-orange/8",
        pitch: "You're missing immediate, high-intent search traffic — Google Ads fix that fast.",
    },
    leadgen: {
        label: "Lead Generation",
        icon: <Users className="w-5 h-5" />,
        accent: "text-brand-green",
        border: "border-brand-green/35",
        bg: "bg-brand-green/8",
        pitch: "You need a structured funnel that delivers qualified leads consistently.",
    },
    smm: {
        label: "Social Media Management",
        icon: <LayoutGrid className="w-5 h-5" />,
        accent: "text-brand-yellow",
        border: "border-brand-yellow/35",
        bg: "bg-brand-yellow/8",
        pitch: "Your brand needs daily visibility and engagement to build trust & community.",
    },
};

type Answer = "yes" | "no" | null;

/* ─── COMPONENT ───────────────────────────────────────────────── */
export const KnowYourBrand = () => {
    const [answers, setAnswers] = useState<Record<number, Answer>>({});
    const [submitted, setSubmitted] = useState(false);

    const totalAnswered = Object.keys(answers).length;
    const allAnswered = totalAnswered === questions.length;

    /* Compute recommended services */
    const recommended = new Set<string>();
    questions.forEach((q) => {
        const ans = answers[q.id];
        if (!ans) return;
        const needsHelp = q.yesOk ? ans === "no" : ans === "yes";
        if (needsHelp) recommended.add(q.service);
    });

    const handleAnswer = (id: number, val: Answer) => {
        setAnswers((prev) => ({ ...prev, [id]: val }));
    };

    const handleSubmit = () => {
        if (allAnswered) setSubmitted(true);
    };

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
    };

    const scorePercent = Math.round((totalAnswered / questions.length) * 100);

    return (
        <section
            id="know-your-brand"
            className="py-28 relative overflow-hidden bg-transparent text-white"
        >
            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-cyan/6 via-transparent to-transparent blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 blur-[130px] rounded-full" />
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-deep-blue/20 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
                {/* ── HEADER ── */}
                <BlurFade delay={0.05} inView>
                    <div className="space-y-4 flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 justify-center">
                            <span className="h-px w-10 bg-brand-cyan/40" />
                            <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Brand Diagnostic</span>
                            <span className="h-px w-10 bg-brand-cyan/40" />
                        </div>

                        {/* Big title with gradient letters */}
                        <div className="relative inline-block">
                            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                                <span className="text-white">Know</span>{" "}
                                <span
                                    className="relative inline-block"
                                    style={{
                                        background: "linear-gradient(135deg, #00a8e8 0%, #fb8500 50%, #48c78e 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Your
                                </span>{" "}
                                <span className="text-white">Brand</span>
                            </h2>
                            {/* Decorative underline */}
                            <div
                                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, #00a8e8, #fb8500, #48c78e)" }}
                            />
                        </div>

                        <p className="text-brand-white/55 text-base max-w-xl leading-relaxed pt-2 mx-auto">
                            Six quick questions. Honest answers. We&apos;ll tell you exactly where your growth gaps are.
                        </p>
                    </div>
                </BlurFade>

                {/* ── 2-COL LAYOUT: Quiz left · Character GIF right ── */}
                <div className="flex flex-col lg:flex-row items-stretch gap-8">
                    {/* Left Column: Quiz Panel */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <GlassCard className="overflow-hidden border border-brand-cyan/15 bg-brand-deep-blue/5 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                                {/* Card Header */}
                                <div className="px-8 py-5 border-b border-brand-white/8 flex items-center justify-between bg-brand-black/30 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 text-brand-cyan" />
                                        <span className="text-white font-black text-sm uppercase tracking-widest font-mono">
                                            The Dimension Diagnostic
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Progress bar */}
                                        <div className="w-28 h-1.5 rounded-full bg-brand-white/10 overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ background: "linear-gradient(90deg, #00a8e8, #fb8500)" }}
                                                animate={{ width: `${scorePercent}%` }}
                                                transition={{ duration: 0.4 }}
                                            />
                                        </div>
                                        <span className="text-brand-cyan text-[10px] font-mono font-bold whitespace-nowrap">
                                            {totalAnswered}/{questions.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Questions */}
                                <div className="divide-y divide-brand-white/6">
                                    {questions.map((q, i) => {
                                        const ans = answers[q.id] ?? null;
                                        return (
                                            <motion.div
                                                key={q.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                                className={`px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-5 transition-colors duration-300 ${ans ? "bg-brand-white/2" : ""}`}
                                            >
                                                {/* Number */}
                                                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black font-mono border border-brand-white/10 text-brand-white/40">
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>

                                                {/* Question text */}
                                                <p className={`flex-1 text-base leading-snug font-medium transition-colors duration-200 ${ans ? "text-white" : "text-brand-white/70"}`}>
                                                    {q.q}
                                                </p>

                                                {/* Yes / No buttons */}
                                                <div className="flex gap-2.5 shrink-0">
                                                    <button
                                                        onClick={() => handleAnswer(q.id, "yes")}
                                                        className={`relative overflow-hidden px-6 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest font-mono transition-all duration-200 cursor-pointer
                                                            ${ans === "yes"
                                                                ? "border-brand-green bg-brand-green text-white shadow-[0_0_20px_rgba(72,199,142,0.35)]"
                                                                : "border-brand-white/15 text-brand-white/50 hover:border-brand-green/50 hover:text-brand-green hover:bg-brand-green/8"
                                                            }`}
                                                    >
                                                        {ans === "yes" && <CheckCircle2 className="w-3 h-3 inline mr-1.5 -mt-0.5" />}
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => handleAnswer(q.id, "no")}
                                                        className={`relative overflow-hidden px-6 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest font-mono transition-all duration-200 cursor-pointer
                                                            ${ans === "no"
                                                                ? "border-brand-orange bg-brand-orange text-white shadow-[0_0_20px_rgba(251,133,0,0.35)]"
                                                                : "border-brand-white/15 text-brand-white/50 hover:border-brand-orange/50 hover:text-brand-orange hover:bg-brand-orange/8"
                                                            }`}
                                                    >
                                                        {ans === "no" && <XCircle className="w-3 h-3 inline mr-1.5 -mt-0.5" />}
                                                        No
                                                    </button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Submit */}
                                <div className="px-8 py-6 border-t border-brand-white/8 bg-brand-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-brand-white/35 text-xs font-mono">
                                        {allAnswered
                                            ? "✓ All answered — ready for your growth analysis"
                                            : `Answer all ${questions.length} questions to unlock your results`}
                                    </p>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!allAnswered}
                                        className={`group relative px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden flex items-center gap-2.5
                                            ${allAnswered
                                                ? "text-white shadow-[0_0_25px_rgba(0,168,232,0.35)] hover:shadow-[0_0_40px_rgba(0,168,232,0.55)] hover:scale-[1.03]"
                                                : "opacity-35 cursor-not-allowed border border-brand-white/15 text-brand-white/50"
                                            }`}
                                        style={allAnswered ? {
                                            background: "linear-gradient(135deg, #00a8e8, #104e92)"
                                        } : {}}
                                    >
                                        Analyse My Brand <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        /* ── RESULTS PANEL ── */
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            {/* Results Header */}
                            <GlassCard className="overflow-hidden border border-brand-white/10 bg-brand-deep-blue/5 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                                {/* Gradient top bar */}
                                <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #00a8e8, #fb8500, #48c78e)" }} />

                                <div className="px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div className="space-y-1.5">
                                        <div className="text-brand-cyan text-[9px] font-mono font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> Analysis Complete
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                                            {recommended.size === 0
                                                ? "Your Brand is Solid 🎯"
                                                : `${recommended.size} Growth Gap${recommended.size > 1 ? "s" : ""} Identified`}
                                        </h3>
                                        <p className="text-brand-white/50 text-sm">
                                            {recommended.size === 0
                                                ? "Impressive — you're covering all the bases. Let's talk scaling."
                                                : "Here's where we can unlock your next growth phase."}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-white/15 text-brand-white/50 hover:text-white hover:border-brand-white/35 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" /> Retake
                                    </button>
                                </div>
                            </GlassCard>

                            {/* Recommendation Cards */}
                            {recommended.size > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Array.from(recommended).map((svcId, i) => {
                                        const svc = serviceMap[svcId];
                                        if (!svc) return null;
                                        return (
                                            <motion.div
                                                key={svcId}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1, duration: 0.45 }}
                                            >
                                                <GlassCard className={`p-6 border ${svc.border} ${svc.bg} h-full group hover:scale-[1.015] transition-transform duration-300`}>
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${svc.border} ${svc.bg} ${svc.accent}`}>
                                                            {svc.icon}
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${svc.accent}`}>
                                                                Recommended
                                                            </div>
                                                            <div className="text-white font-bold text-sm">{svc.label}</div>
                                                            <p className="text-brand-white/55 text-sm leading-snug">{svc.pitch}</p>
                                                        </div>
                                                    </div>
                                                </GlassCard>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* CTA — Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <GlassCard className="relative overflow-hidden border border-brand-cyan/20 bg-brand-deep-blue/5 shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
                                    {/* Vivid gradient background */}
                                    <div
                                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                                        style={{ background: "linear-gradient(135deg, #00a8e8 0%, #104e92 50%, #fb8500 100%)" }}
                                    />
                                    <div className="absolute inset-0 gaming-grid opacity-15 pointer-events-none" />

                                    <div className="relative z-10 px-8 py-10 flex flex-col md:flex-row items-center gap-8">
                                        <div className="flex-1 space-y-3 text-center md:text-left">
                                            <div className="text-brand-cyan text-[9px] font-mono font-bold uppercase tracking-[0.3em]">
                                                Next Step
                                            </div>
                                            <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic leading-tight">
                                                Let&apos;s Build Your
                                                <br />
                                                <span
                                                    style={{
                                                        background: "linear-gradient(90deg, #00a8e8, #fb8500)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        backgroundClip: "text",
                                                    }}
                                                >
                                                    Growth Strategy
                                                </span>
                                            </h4>
                                            <p className="text-brand-white/55 text-sm max-w-md">
                                                Share your results with our team. We&apos;ll put together a custom growth plan — no generic proposals, just real strategy.
                                            </p>
                                        </div>

                                        <div className="shrink-0">
                                            <Link
                                                href="#contact"
                                                onClick={(e) => scrollToSection(e, "#contact")}
                                            >
                                                <button className="group relative px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-3 shadow-[0_0_30px_rgba(251,133,0,0.3)] hover:shadow-[0_0_50px_rgba(251,133,0,0.55)]"
                                                    style={{ background: "linear-gradient(135deg, #fb8500, #e07000)" }}
                                                >
                                                    Contact Us
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                    </div>

                    {/* Right Column: Character GIF */}
                    <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 h-[450px] lg:h-auto lg:sticky lg:top-24">
                        <BlurFade delay={0.1} inView className="h-full">
                            <GlassCard className="relative w-full h-full overflow-hidden border border-brand-cyan/15 bg-brand-deep-blue/5 shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col justify-end items-center p-6">
                                {/* Subtle background glow */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: "radial-gradient(ellipse 75% 50% at 50% 85%, rgba(0,168,232,0.12) 0%, transparent 70%)"
                                }} />

                                {/* Ground shadow ellipse */}
                                <div
                                    className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-40 h-4 rounded-full pointer-events-none blur-[6px]"
                                    style={{ background: "radial-gradient(ellipse, rgba(0,168,232,0.25), transparent 70%)" }}
                                />

                                {/* Character GIF */}
                                <div className="relative w-full h-full z-10 flex items-end justify-center overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/creatives/5.gif"
                                        alt="Diagnostic Agent"
                                        className="w-full h-full object-contain"
                                        loading="eager"
                                        style={{
                                            mixBlendMode: "multiply",
                                            filter: "drop-shadow(0 0 25px rgba(0,168,232,0.25))",
                                        }}
                                    />
                                </div>
                            </GlassCard>
                        </BlurFade>
                    </div>
                </div>
            </div>
            {/* close max-w container */}
        </section>
    );
};
