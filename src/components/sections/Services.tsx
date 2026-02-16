"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Activity, Layers, PenTool, Zap } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";

const services = [
    {
        title: "Marketing Strategy",
        description: "Comprehensive go-to-market plans tailored for rapid growth.",
        icon: <Activity className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Design & Identity",
        description: "Visual branding that resonates and builds instant credibility.",
        icon: <PenTool className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Digital Systems",
        description: "Optimized web platforms and automation for seamless operations.",
        icon: <Layers className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Performance Ads",
        description: "High-ROI paid media campaigns across Meta, Google, and LinkedIn.",
        icon: <Zap className="w-8 h-8 text-blue-500" />,
    },
];

export const Services = () => {
    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade delay={0.1} inView>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Expertise</h2>
                        <p className="text-blue-200 max-w-2xl mx-auto">
                            Providing end-to-end solutions for ambitious brands ready to break through the noise.
                        </p>
                    </motion.div>
                </BlurFade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <BlurFade key={index} delay={0.2 + index * 0.1} inView>
                            <GlassCard
                                className="group transition-all duration-500 p-8 flex flex-col items-center text-center bg-black/40 backdrop-blur-3xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div className="p-4 rounded-full bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-blue-200/80 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </GlassCard>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};
