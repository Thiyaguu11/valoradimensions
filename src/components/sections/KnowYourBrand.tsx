"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { Check, Info, ArrowRight, Sparkles, Zap, ShieldCheck, Lock } from "lucide-react";
import confetti from "canvas-confetti";

const questions = [
    {
        id: 1,
        text: "Would you like us to manage your social media?",
    },
    {
        id: 2,
        text: "Are you posting consistently on your social media?",
    },
    {
        id: 3,
        text: "Do you want to increase your followers?",
    },
    {
        id: 4,
        text: "Do you want posters and reels to share with your clients on WhatsApp, Facebook, and Instagram?",
    },
    {
        id: 5,
        text: "Do you want leads for your business?",
    },
    {
        id: 6,
        text: "Do you want us to set Lead Funnel?",
    },
];

const plans = {
    A: {
        name: "ORBIT DIMENSION",
        price: "Rs 9,999/Month",
        description: "Perfect for foundational social presence.",
        icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
        features: [
            "6-8 Creatives",
            "Strategy development",
            "Graphic Designs & Video editing",
            "Social media management",
            "Monthly reporting",
            "Feedback form",
        ],
    },
    B: {
        name: "SPECTRUM DIMENSION",
        price: "Rs 15,000/Month",
        description: "Advanced growth & lead generation.",
        icon: <Zap className="w-8 h-8 text-blue-500" />,
        features: [
            "8-10 Creatives",
            "Everything in Orbit Dimensions",
            "Lead Generation (Ad Spent separately)",
            "Keyword separation",
            "Website Audit",
            "Up to 13X Traffic Growth",
        ],
    },
    C: {
        name: "ELEVATE DIMENSION",
        price: "Rs 28,999/Month",
        description: "The ultimate marketing powerhouse.",
        icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
        features: [
            "12-15 Creatives",
            "Everything in SPECTRUM DIMENSION",
            "Personal Branding",
            "Influencer Marketing",
            "Blog & SEO content",
            "Up to 2X-3X Traffic Growth",
        ],
    },
};

export const KnowYourBrand = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [recommendedPlanKey, setRecommendedPlanKey] = useState<string | null>(null);

    const handleAnswer = (questionId: number, answer: string) => {
        if (isSubmitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length < 6) return;

        const isYes = (id: number) => answers[id] === "Yes";
        const yesCount = Object.values(answers).filter(a => a === "Yes").length;

        let plan: string | null = null;

        const g1Count = [1, 2, 3].filter(id => isYes(id)).length;
        const g2Count = [4, 5, 6].filter(id => isYes(id)).length;

        // Group Comparison Logic Engine:
        // C: Perfect match score
        if (yesCount === 6) {
            plan = "C";
        }
        // B: Near-perfect OR Scaling dominance/equality
        else if (yesCount === 5 || (yesCount > 0 && g2Count >= g1Count)) {
            plan = "B";
        }
        // A: Foundation dominance
        else if (yesCount > 0) {
            plan = "A";
        }

        setRecommendedPlanKey(plan);
        setIsSubmitted(true);

        // Celebrating the submission with "Graffiti" (Confetti)
        if (plan) {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Fireworks effect
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#2563eb', '#3b82f6', '#60a5fa', '#ffffff']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#2563eb', '#3b82f6', '#60a5fa', '#ffffff']
                });
            }, 250);
        }
    };

    const activePlan = recommendedPlanKey ? plans[recommendedPlanKey as keyof typeof plans] : null;
    const isCompleted = Object.keys(answers).length === 6;

    return (
        <section id="know-your-brand" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade delay={0.1} inView>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Know your brand!</h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto text-lg">
                            Finalize your strategy by answering our dimension diagnostic tool.
                        </p>
                    </div>
                </BlurFade>

                <motion.div
                    layout
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className={`grid gap-16 items-start ${isSubmitted ? "lg:grid-cols-[896px_1fr] max-w-none px-4" : "grid-cols-1 max-w-4xl mx-auto"
                        }`}
                >
                    {/* Questionnaire */}
                    <motion.div
                        layout
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full h-full"
                    >
                        <GlassCard className={`p-8 space-y-8 bg-white/5 border-white/10 w-full h-full min-h-[750px] flex flex-col transition-all duration-500 ${isSubmitted ? 'opacity-70 grayscale-[0.2]' : ''}`}>
                            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    Dimension Diagnostics
                                    {isSubmitted && <Lock className="w-4 h-4 text-blue-500" />}
                                </h3>
                                <div className="text-xs text-blue-400 font-black uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                                    {isSubmitted ? "Selection Locked" : `${Object.keys(answers).length}/6 Answered`}
                                </div>
                            </div>

                            <div className="space-y-4 flex-grow">
                                {questions.map((q) => (
                                    <div key={q.id} className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                            <p className="text-white font-medium leading-relaxed group-hover:text-blue-100 transition-colors">{q.text}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            {["Yes", "No", "No idea"].map((option) => (
                                                <button
                                                    key={option}
                                                    disabled={isSubmitted}
                                                    onClick={() => handleAnswer(q.id, option)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${answers[q.id] === option
                                                        ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                                        : "bg-white/5 border-white/10 text-blue-200/60 hover:border-blue-500/30 hover:text-white disabled:opacity-50"
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5 flex justify-center min-h-[100px] items-center">
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!isCompleted}
                                        className={`px-12 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${isCompleted
                                            ? "bg-white text-black hover:bg-blue-50 hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                            : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                                            }`}
                                    >
                                        Submit Requirements <ArrowRight className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-3 text-blue-400 font-bold italic opacity-40">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span>Diagnostics Analyzed</span>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Recommendation Display - Sequential Slide In */}
                    <AnimatePresence mode="wait">
                        {isSubmitted && (
                            <div className="space-y-6 w-full h-full flex flex-col">
                                {activePlan ? (
                                    <>
                                        {/* Box 1: Congratulations - Slides from right after delay (settle first) */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 300 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                                        >
                                            <GlassCard className="p-6 lg:p-8 bg-blue-600/10 border-blue-500/30 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                    {activePlan.icon}
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                                        <div className="w-8 h-8 text-blue-400">{activePlan.icon}</div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-blue-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">Congratulations!!!</h4>
                                                        <h3 className="text-2xl xl:text-3xl font-black text-white leading-tight">{activePlan.name}</h3>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </motion.div>

                                        {/* Box 2: Plan Breakdown - Slides from right slightly after Box 1 */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 300 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                                            className="flex-grow"
                                        >
                                            <GlassCard className="p-6 lg:p-8 bg-white/5 border-white/10 relative h-full flex flex-col">
                                                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-white mb-1">Plan Breakdown:</h4>
                                                        <p className="text-blue-200/40 text-[9px] uppercase tracking-widest font-bold">Included Services</p>
                                                    </div>
                                                    <div className="text-right p-4 rounded-xl bg-blue-600/10 border border-blue-500/30">
                                                        <div className="text-blue-400 text-2xl font-black">{activePlan.price}</div>
                                                        <div className="text-[9px] text-blue-300/30 uppercase tracking-[0.2em] font-bold">Full Value</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 flex-grow content-start">
                                                    {activePlan.features.map((feature, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 1.4 + i * 0.05 }}
                                                            className="flex items-center gap-3 text-blue-100/90 group list-none"
                                                        >
                                                            <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 transition-all duration-300">
                                                                <Check className="w-2 h-2 text-white" />
                                                            </div>
                                                            <span className="font-semibold text-xs group-hover:text-white transition-colors">{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </div>

                                                <div className="mt-auto">
                                                    <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-4 hover:bg-blue-500 hover:scale-[1.02] transition-all group shadow-[0_20px_40px_rgba(59,130,246,0.3)] active:scale-95">
                                                        Activate My Dimension <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                    <div className="flex items-center justify-center gap-3 mt-4 opacity-30">
                                                        <Info className="w-3 h-3 text-blue-400" />
                                                        <p className="text-blue-200 text-[9px] tracking-[0.2em] uppercase font-black">Strategy Session Included • No Contracts</p>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 200 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <GlassCard className="p-16 lg:p-20 bg-blue-600/5 border-dashed border-blue-500/30 flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-8">
                                                <ShieldCheck className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4 italic">Analysis Complete</h3>
                                            <p className="text-blue-200/60 max-w-sm mb-8 text-sm leading-relaxed">
                                                Your brand requirements are unique. Based on our analysis, let's have a quick 1-on-1 strategy call to tailor a dimension specifically for your growth.
                                            </p>
                                            <button className="bg-white text-black font-black px-10 py-4 rounded-xl hover:bg-blue-50 transition-all">
                                                Schedule Custom Call
                                            </button>
                                        </GlassCard>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
