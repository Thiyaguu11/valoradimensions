"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { Check, Info, ArrowRight, Sparkles, Zap, ShieldCheck, Lock } from "lucide-react";

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

        // Logic sequence derived from user requirements:
        // 1. All Yes -> Plan C
        if (yesCount === 6) {
            plan = "C";
        }
        // 2. Any 5 Yes -> Plan B (Explicitly requested)
        else if (yesCount === 5) {
            plan = "B";
        }
        // 3. 1, 2, 3 No and 4, 5, 6 Yes -> Plan B
        else if (!isYes(1) && !isYes(2) && !isYes(3) && isYes(4) && isYes(5) && isYes(6)) {
            plan = "B";
        }
        // 4. 1, 2, 3 Yes -> Plan A
        else if (isYes(1) && isYes(2) && isYes(3)) {
            plan = "A";
        }

        setRecommendedPlanKey(plan);
        setIsSubmitted(true);
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

                <div className="flex flex-col gap-12">
                    {/* Questionnaire */}
                    <BlurFade delay={0.2} inView>
                        <GlassCard className={`p-8 space-y-8 bg-white/5 border-white/10 max-w-4xl mx-auto w-full transition-all duration-500 ${isSubmitted ? 'opacity-70 pointer-events-none grayscale-[0.2]' : ''}`}>
                            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    Dimension Diagnostics
                                    {isSubmitted && <Lock className="w-4 h-4 text-blue-500" />}
                                </h3>
                                <div className="text-xs text-blue-400 font-black uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                                    {isSubmitted ? "Selection Locked" : `${Object.keys(answers).length}/6 Answered`}
                                </div>
                            </div>

                            {questions.map((q) => (
                                <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <div className="flex gap-4 items-start">
                                        <span className="text-blue-500 font-bold min-w-[20px]">{q.id}.</span>
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

                            {!isSubmitted && (
                                <div className="pt-8 border-t border-white/5 flex justify-center">
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
                                </div>
                            )}
                        </GlassCard>
                    </BlurFade>

                    {/* Recommendation Display */}
                    <div className="max-w-4xl mx-auto w-full">
                        <AnimatePresence mode="wait">
                            {isSubmitted && (
                                <motion.div
                                    key={recommendedPlanKey || "no-match"}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                                    className="space-y-12"
                                >
                                    {activePlan ? (
                                        <>
                                            {/* Component 2: Plan Header */}
                                            <GlassCard className="p-10 bg-blue-600/10 border-blue-500/30 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                    {activePlan.icon}
                                                </div>
                                                <div className="flex flex-col md:flex-row items-center gap-10">
                                                    <div className="w-28 h-28 rounded-3xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                                                        {activePlan.icon}
                                                    </div>
                                                    <div className="text-center md:text-left">
                                                        <h4 className="text-blue-500 font-bold tracking-[0.2em] text-sm uppercase mb-3 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Congratulations!!!</h4>
                                                        <p className="text-white text-lg md:text-xl font-medium mb-3 opacity-90">
                                                            Based on your requirements, we recommend
                                                        </p>
                                                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">{activePlan.name}</h3>
                                                    </div>
                                                </div>
                                            </GlassCard>

                                            {/* Component 3: Plan Breakdown */}
                                            <GlassCard className="p-12 bg-white/5 border-white/10 relative">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8 gap-6">
                                                    <div>
                                                        <h4 className="text-2xl font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-8">Plan Breakdown:</h4>
                                                        <p className="text-blue-200/40 text-sm mt-4 uppercase tracking-widest font-bold">Services included in your dimension</p>
                                                    </div>
                                                    <div className="text-left md:text-right p-8 rounded-3xl bg-blue-600/10 border border-blue-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                                        <div className="text-blue-400 text-3xl md:text-4xl font-black">{activePlan.price}</div>
                                                        <div className="text-xs text-blue-300/40 uppercase tracking-[0.3em] mt-2 font-bold">Full Value Package</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                                    {activePlan.features.map((feature, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -15 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.4 + i * 0.08 }}
                                                            className="flex items-center gap-6 text-blue-100/90 group list-none"
                                                        >
                                                            <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="font-semibold text-[1.1rem] group-hover:text-white transition-colors">{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </div>

                                                <div className="mt-20 flex flex-col items-center">
                                                    <button className="w-full md:w-auto px-16 bg-blue-600 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-500 hover:scale-[1.03] transition-all group shadow-[0_20px_50px_rgba(59,130,246,0.3)] active:scale-95">
                                                        Activate My Dimension <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                    <div className="flex items-center gap-4 mt-8 opacity-40 group cursor-help">
                                                        <Info className="w-4 h-4 text-blue-400" />
                                                        <p className="text-blue-200 text-xs tracking-[0.2em] uppercase font-black">Strategy Session Included • No Contracts</p>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </>
                                    ) : (
                                        <GlassCard className="p-20 bg-blue-600/5 border-dashed border-blue-500/30 flex flex-col items-center text-center">
                                            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-8">
                                                <ShieldCheck className="w-10 h-10 text-blue-400" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4 italic">Analysis Complete</h3>
                                            <p className="text-blue-200/60 max-w-sm mb-8">
                                                Your brand requirements are unique. Based on our analysis, let's have a quick 1-on-1 strategy call to tailor a dimension specifically for your growth.
                                            </p>
                                            <button className="bg-white text-black font-black px-10 py-4 rounded-xl hover:bg-blue-50 transition-all">
                                                Schedule Custom Call
                                            </button>
                                        </GlassCard>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
