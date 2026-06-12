"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { cn, scrollToSection } from "@/lib/utils";
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
        icon: <Monitor className="w-4 h-4" />,
        accent: "text-brand-cyan",
        border: "border-brand-cyan/25",
        bg: "bg-brand-cyan/5",
        pitch: "You need a modern, high-converting digital storefront that works 24/7.",
    },
    googleads: {
        label: "Google Ads",
        icon: <Search className="w-4 h-4" />,
        accent: "text-brand-orange",
        border: "border-brand-orange/25",
        bg: "bg-brand-orange/5",
        pitch: "You're missing immediate, high-intent search traffic — Google Ads fix that fast.",
    },
    leadgen: {
        label: "Lead Generation",
        icon: <Users className="w-4 h-4" />,
        accent: "text-brand-green",
        border: "border-brand-green/25",
        bg: "bg-brand-green/5",
        pitch: "You need a structured funnel that delivers qualified leads consistently.",
    },
    smm: {
        label: "Social Media Management",
        icon: <LayoutGrid className="w-4 h-4" />,
        accent: "text-brand-yellow",
        border: "border-brand-yellow/25",
        bg: "bg-brand-yellow/5",
        pitch: "Your brand needs daily visibility and engagement to build trust & community.",
    },
};

type Answer = "yes" | "no" | null;

/* ─── COMPONENT ───────────────────────────────────────────────── */
export const KnowYourBrand = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        if (allAnswered) {
            setSubmitted(true);
            try {
                const recommendedList = Array.from(recommended).map(svcId => serviceMap[svcId]?.label || svcId);
                const diagnosticInfo = {
                    recommendedServices: recommendedList,
                    answers: questions.map(q => ({
                        question: q.q,
                        answer: answers[q.id]
                    }))
                };
                localStorage.setItem("valora_diagnostic_results", JSON.stringify(diagnosticInfo));
            } catch (e) {
                console.error("Error storing diagnostic results:", e);
            }
        }
    };

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        try {
            localStorage.removeItem("valora_diagnostic_results");
        } catch (e) {
            console.error("Error removing diagnostic results:", e);
        }
    };

    const scorePercent = Math.round((totalAnswered / questions.length) * 100);

    return (
        <section
            id="know-your-brand"
            className="py-24 relative overflow-hidden bg-transparent text-white"
        >
            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-cyan/6 via-transparent to-transparent blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 blur-[130px] rounded-full" />
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-deep-blue/20 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12 text-center">
                {/* ── HEADER ── */}
                <BlurFade delay={0.05} inView>
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="flex items-center gap-3 justify-center">
                            <span className="h-px w-10 bg-brand-cyan/40" />
                            <span className="text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Brand Diagnostic</span>
                            <span className="h-px w-10 bg-brand-cyan/40" />
                        </div>

                        {/* Big title with gradient letters */}
                        <div className="relative inline-block pr-4">
                            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
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

                        <p className="text-brand-white/55 text-base max-w-xl leading-relaxed pt-2.5 mx-auto">
                            Six quick questions. Honest answers. We&apos;ll tell you exactly where your growth gaps are.
                        </p>
                    </div>
                </BlurFade>

                {/* ── LAUNCH BUTTON ── */}
                <BlurFade delay={0.1} inView>
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative py-4 px-8 bg-gradient-to-r from-brand-cyan to-[#104e92] hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-[0_0_20px_rgba(0,168,232,0.35)] hover:shadow-[0_0_35px_rgba(0,168,232,0.55)] border border-brand-cyan/30 cursor-pointer flex items-center justify-center gap-2.5 animate-pulse hover:animate-none"
                        >
                            <Sparkles className="w-4 h-4 text-brand-yellow shrink-0 animate-spin" style={{ animationDuration: "3s" }} />
                            <span>Audit Your Business Growth</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </BlurFade>
            </div>

            {/* ── MODAL DIALOG ── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative z-10 w-full max-w-md bg-[#070d19]/95 border border-brand-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[80vh] flex flex-col justify-between"
                        >
                            {/* Scrollable container for modal contents */}
                            <div className="overflow-y-auto scrollbar-none flex-1">
                                {!submitted ? (
                                    /* Diagnostic Form */
                                    <div>
                                        {/* Card Header */}
                                        <div className="px-6 py-5 border-b border-brand-white/8 flex items-center justify-between bg-brand-black/35 backdrop-blur-sm sticky top-0 z-20">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
                                                <span className="text-white font-black text-xs uppercase tracking-widest font-mono">
                                                    Dimension Diagnostic
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* Progress bar */}
                                                <div className="w-20 h-1 rounded-full bg-brand-white/10 overflow-hidden">
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
                                                <button
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="text-brand-white/40 hover:text-white transition-colors p-1 rounded hover:bg-white/5 cursor-pointer font-mono font-black text-sm leading-none ml-1"
                                                >
                                                    ✕
                                                </button>
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
                                                        transition={{ delay: i * 0.05, duration: 0.35 }}
                                                        className={cn(
                                                            "px-6 py-5 flex flex-col gap-3.5 transition-colors duration-350",
                                                            ans ? "bg-brand-white/2" : ""
                                                        )}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {/* Number */}
                                                            <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black font-mono border border-brand-white/10 text-brand-white/40 mt-0.5">
                                                                {String(i + 1).padStart(2, "0")}
                                                            </div>
                                                            {/* Question text */}
                                                            <p className={cn(
                                                                "flex-1 text-sm leading-snug font-medium transition-colors duration-200",
                                                                ans ? "text-white" : "text-brand-white/70"
                                                            )}>
                                                                {q.q}
                                                            </p>
                                                        </div>

                                                        {/* Yes / No buttons */}
                                                        <div className="flex gap-2.5 shrink-0 pl-9">
                                                            <button
                                                                onClick={() => handleAnswer(q.id, "yes")}
                                                                className={cn(
                                                                    "relative overflow-hidden px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest font-mono transition-all duration-200 cursor-pointer",
                                                                    ans === "yes"
                                                                        ? "border-brand-green bg-brand-green text-white shadow-[0_0_15px_rgba(72,199,142,0.3)]"
                                                                        : "border-brand-white/10 text-brand-white/50 hover:border-brand-green/40 hover:text-brand-green hover:bg-brand-green/5"
                                                                )}
                                                            >
                                                                {ans === "yes" && <CheckCircle2 className="w-3 h-3 inline mr-1 -mt-0.5" />}
                                                                Yes
                                                            </button>
                                                            <button
                                                                onClick={() => handleAnswer(q.id, "no")}
                                                                className={cn(
                                                                    "relative overflow-hidden px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest font-mono transition-all duration-200 cursor-pointer",
                                                                    ans === "no"
                                                                        ? "border-brand-orange bg-brand-orange text-white shadow-[0_0_15px_rgba(251,133,0,0.3)]"
                                                                        : "border-brand-white/10 text-brand-white/50 hover:border-brand-orange/40 hover:text-brand-orange hover:bg-brand-orange/5"
                                                                )}
                                                            >
                                                                {ans === "no" && <XCircle className="w-3 h-3 inline mr-1 -mt-0.5" />}
                                                                No
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Submit Footer */}
                                        <div className="px-6 py-5 border-t border-brand-white/8 bg-brand-black/25 flex flex-col gap-3 sticky bottom-0 z-20 backdrop-blur-md">
                                            <p className="text-brand-white/35 text-[9px] font-mono text-center">
                                                {allAnswered
                                                    ? "✓ All answered — ready for analysis"
                                                    : `Answer all ${questions.length} questions to unlock results`}
                                            </p>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={!allAnswered}
                                                className={cn(
                                                    "group relative w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center gap-2",
                                                    allAnswered
                                                        ? "text-white shadow-[0_0_20px_rgba(0,168,232,0.3)] hover:shadow-[0_0_30px_rgba(0,168,232,0.5)] hover:scale-[1.01]"
                                                        : "opacity-35 cursor-not-allowed border border-brand-white/10 text-brand-white/50"
                                                )}
                                                style={allAnswered ? {
                                                    background: "linear-gradient(135deg, #00a8e8, #104e92)"
                                                } : {}}
                                            >
                                                <span>Analyse My Brand</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ── RESULTS PANEL ── */
                                    <div className="p-6 space-y-5">
                                        {/* Sticky Results Header */}
                                        <div className="flex items-center justify-between border-b border-brand-white/8 pb-4">
                                            <div className="space-y-1 text-left">
                                                <div className="text-brand-cyan text-[8px] font-mono font-bold uppercase tracking-[0.25em] flex items-center gap-1.5 animate-pulse">
                                                    <Sparkles className="w-3 h-3 text-brand-yellow" /> Analysis Complete
                                                </div>
                                                <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                                                    {recommended.size === 0
                                                        ? "Your Brand is Solid 🎯"
                                                        : `${recommended.size} Growth Gap${recommended.size > 1 ? "s" : ""} Identified`}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={handleReset}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-white/10 text-brand-white/40 hover:text-white hover:border-brand-white/25 transition-all text-[9px] font-mono uppercase tracking-wider cursor-pointer"
                                            >
                                                <RotateCcw className="w-3 h-3" /> Retake
                                            </button>
                                        </div>

                                        {/* Recommendation Cards */}
                                        {recommended.size > 0 ? (
                                            <div className="flex flex-col gap-3">
                                                {Array.from(recommended).map((svcId, i) => {
                                                    const svc = serviceMap[svcId];
                                                    if (!svc) return null;
                                                    return (
                                                        <motion.div
                                                            key={svcId}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.08, duration: 0.3 }}
                                                        >
                                                            <div className={`p-4 rounded-xl border ${svc.border} ${svc.bg} flex items-start gap-3 text-left`}>
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${svc.border} ${svc.bg} ${svc.accent}`}>
                                                                    {svc.icon}
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <div className={`text-[8px] font-mono font-bold uppercase tracking-[0.2em] ${svc.accent}`}>
                                                                        Recommended
                                                                    </div>
                                                                    <div className="text-white font-bold text-xs">{svc.label}</div>
                                                                    <p className="text-brand-white/75 text-xs leading-normal">{svc.pitch}</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center text-brand-white/60 text-xs">
                                                Great job! Your growth checklist is complete. Let&apos;s build scaling systems.
                                            </div>
                                        )}

                                        {/* CTA Card */}
                                        <div className="relative overflow-hidden border border-brand-cyan/20 bg-[#0c1527] rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] text-left">
                                            <div className="absolute inset-0 gaming-grid opacity-10 pointer-events-none" />
                                            <div className="relative z-10 space-y-3">
                                                <div className="text-brand-cyan text-[8px] font-mono font-bold uppercase tracking-widest">
                                                    Next Step
                                                </div>
                                                <h4 className="text-base font-black text-white uppercase tracking-tight italic leading-tight">
                                                    Let&apos;s Build Your Growth Strategy
                                                </h4>
                                                <p className="text-brand-white/50 text-xs leading-normal">
                                                    Share your results with our team. We&apos;ll put together a custom growth plan.
                                                </p>
                                                <Link
                                                    href="#contact"
                                                    onClick={(e) => {
                                                        setIsModalOpen(false);
                                                        scrollToSection(e, "#contact");
                                                    }}
                                                    className="block pt-2"
                                                >
                                                    <button className="w-full group relative py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,133,0,0.25)] hover:shadow-[0_0_35px_rgba(251,133,0,0.45)]"
                                                        style={{ background: "linear-gradient(135deg, #fb8500, #e07000)" }}
                                                    >
                                                        <span>Contact Us</span>
                                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
