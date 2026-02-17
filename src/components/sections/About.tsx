"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import NumberTicker from "@/components/ui/NumberTicker";
import { BlurFade } from "@/components/ui/BlurFade";
import { ShieldCheck, Target, Rocket } from "lucide-react";
import Image from "next/image";

export const About = () => {
    return (
        <section id="about" className="py-32 relative text-white overflow-hidden">
            {/* Header Block */}
            <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <BlurFade delay={0.1} inView>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase">
                            About
                        </h2>
                    </div>
                </BlurFade>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
                {/* Row 1: Top Bento Row (3 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Col 1: Hero Typography (6/12) */}
                    <BlurFade delay={0.2} inView className="lg:col-span-6">
                        <GlassCard className="p-8 md:p-12 h-full flex flex-col justify-center bg-white/5 border-white/10 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
                                    WE CAN BE <span className="text-blue-500 underline decoration-white/20 underline-offset-8">YOUR EXTENDED GROWTH PARTNER</span> TO ENSURE SUCCESS
                                </h3>
                                <div className="space-y-4 text-blue-100/60 text-lg leading-relaxed max-w-xl">
                                    <p>Unlike typical agency setups, we become an extension of your in-house team, a partner that understands your market and goals and makes data-backed decisions.</p>
                                    <p>With more competition online than ever before, it's critical to work with a company that shares your vision and delivers the results you need now and in the future.</p>
                                </div>
                            </div>
                        </GlassCard>
                    </BlurFade>

                    {/* Col 2: Stacked Vision/Mission (3/12) */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <BlurFade delay={0.3} inView className="flex-1">
                            <GlassCard className="p-8 h-full bg-blue-600/5 border-blue-500/10 group/vision relative overflow-hidden flex flex-col justify-center items-center text-center">
                                <Target className="w-16 h-16 text-blue-500/10 absolute -bottom-2 -right-2" />
                                <h5 className="text-blue-400 font-black uppercase tracking-widest text-2xl mb-6 flex items-center gap-3 italic">
                                    <Target className="w-6 h-6" /> Vision
                                </h5>
                                <p className="text-lg text-white font-bold leading-tight">
                                    Building brands that scale with clarity and confidence.
                                </p>
                            </GlassCard>
                        </BlurFade>
                        <BlurFade delay={0.4} inView className="flex-1">
                            <GlassCard className="p-8 h-full bg-white/5 border-white/10 group/mission relative overflow-hidden flex flex-col justify-center items-center text-center">
                                <Rocket className="w-16 h-16 text-white/5 absolute -bottom-2 -right-2" />
                                <h5 className="text-blue-200/40 font-black uppercase tracking-widest text-2xl mb-6 flex items-center gap-3 italic">
                                    <Rocket className="w-6 h-6" /> Mission
                                </h5>
                                <p className="text-lg text-white font-bold leading-tight">
                                    Designing strategy-led growth systems that deliver predictable, measurable outcomes.
                                </p>
                            </GlassCard>
                        </BlurFade>
                    </div>

                    {/* Col 3: Video Card (3/12) */}
                    <BlurFade delay={0.5} inView className="lg:col-span-3">
                        <GlassCard className="h-full min-h-[400px] flex items-center justify-center bg-white/5 border-white/10 overflow-hidden relative group p-4">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                <video
                                    src="/Vi1.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </GlassCard>
                    </BlurFade>
                </div>

                {/* Row 2: Main Narrative Bento (12 Columns) */}
                <BlurFade delay={0.6} inView>
                    <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                        {/* Top: Light Theme Section (Subtle White/Grey) */}
                        <div className="bg-[#f5f5f7] p-8 md:p-12 relative overflow-hidden border-b border-black/5">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                            <div className="relative z-10 space-y-4">
                                <h4 className="text-lg md:text-xl font-bold text-black/40 tracking-tight">
                                    Valora was born from a simple realization!
                                </h4>
                                <div className="space-y-2">
                                    <p className="text-2xl md:text-4xl font-black text-black leading-[1.1] tracking-tighter">
                                        Great businesses don’t <span className="text-red-600">fail</span> because of weak products.
                                    </p>
                                    <p className="text-2xl md:text-4xl font-black text-black leading-[1.1] tracking-tighter">
                                        They struggle because growth <span className="text-red-600">lacks</span> structure.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Dark Theme Section with Floating Metric */}
                        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 relative bg-white/5 backdrop-blur-md">
                            <div className="flex-1 space-y-6">
                                <p className="text-blue-100/60 leading-relaxed text-lg md:text-xl font-medium">
                                    We saw too many businesses investing in marketing without clarity—running ads, posting content, and chasing trends without a system, leading to inconsistent leads and unpredictable results.
                                </p>
                                <p className="text-blue-100/60 leading-relaxed text-lg md:text-xl italic font-medium">
                                    Valora exists to replace that chaos with strategy-led growth. We design clear, focused systems across social media, lead generation, and performance marketing that turn attention into measurable outcomes. We don’t believe in multitasking—we believe in building brands with <span className="text-blue-400 font-bold">one dimension at a time</span>.
                                </p>
                            </div>

                            {/* Floating Growth metrics */}
                            <div className="md:w-1/3 flex items-center justify-center">
                                <GlassCard className="p-8 w-full max-w-[300px] border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50" />
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-green-500 rounded-sm rotate-45" />
                                            </div>
                                            <span className="text-white font-bold uppercase tracking-widest text-xs">Growth Metrics</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-5xl font-black text-white flex items-baseline gap-1">
                                                <span className="text-2xl text-green-500">+</span>
                                                <NumberTicker value={145} className="text-white" />
                                                <span className="text-2xl text-white">%</span>
                                            </div>
                                            <span className="text-blue-300/40 text-[10px] font-black uppercase tracking-widest block">Client Revenue YoY</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 blur-2xl flex translate-x-8 translate-y-8">
                                        <div className="w-8 h-[20%] bg-white/20 ml-2 mt-auto" />
                                        <div className="w-8 h-[40%] bg-white/20 ml-2 mt-auto" />
                                        <div className="w-8 h-[60%] bg-white/20 ml-2 mt-auto" />
                                        <div className="w-8 h-[80%] bg-white/20 ml-2 mt-auto" />
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </BlurFade>

                {/* Row 3: Focus Areas (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { title: "Brand thinking", desc: "Positioning, messaging, storytelling" },
                        { title: "Performance marketing", desc: "Campaigns, funnels, lead generation" },
                        { title: "Growth systems", desc: "Repeatable processes, data-backed decisions" }
                    ].map((item, idx) => (
                        <BlurFade key={idx} delay={0.7 + idx * 0.1} inView>
                            <GlassCard className="p-8 bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-500 group h-full flex flex-col items-center text-center">
                                <span className="text-blue-400 font-black text-xl block mb-2 uppercase tracking-tighter group-hover:text-blue-300 transition-colors">{item.title}</span>
                                <span className="text-blue-100/40 text-sm leading-relaxed font-bold block">{item.desc}</span>
                            </GlassCard>
                        </BlurFade>
                    ))}
                </div>

                {/* Row 4: Final Unified Stats Card */}
                <BlurFade delay={1.0} inView>
                    <GlassCard className="p-12 md:p-16 bg-blue-600/5 backdrop-blur-3xl border border-blue-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                            {[
                                { label: "Clients Worldwide", value: 10, suffix: " +" },
                                { label: "Projects Completed", value: 500, suffix: " +" },
                                { label: "Leads Generated", value: 6000, suffix: " +" },
                                { label: "Average ROI", value: 3, suffix: "X" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center group/stat">
                                    <div className="text-4xl md:text-6xl font-black text-white mb-2 group-hover/stat:text-blue-400 transition-colors drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                        <NumberTicker value={stat.value} className="text-white group-hover/stat:text-blue-400 transition-colors" />{stat.suffix}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-blue-300/40 uppercase tracking-[0.3em] font-black">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </BlurFade>
            </div>
        </section>
    );
};
