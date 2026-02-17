"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { TrendingUp, Share2, Target, Monitor } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";

const services = [
    {
        title: "Growth Strategy",
        description: "We design structured growth frameworks that align positioning, visibility, and revenue goals. Clear plans. Measurable outcomes. Scalable systems.",
        icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Social Media Management",
        description: "We build consistent, authority-driven content systems that strengthen your brand presence and support business growth. Not just posts — purposeful visibility.",
        icon: <Share2 className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Lead Gen & Performance Ads",
        description: "We create predictable lead systems using data-driven campaigns that convert attention into qualified prospects and measurable ROI. No vanity metrics. Only real results.",
        icon: <Target className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Web Development",
        description: "We build high-converting, performance-focused websites designed to support your growth system, from landing pages to full business websites. Built for clarity. Designed for conversion.",
        icon: <Monitor className="w-8 h-8 text-blue-500" />,
    },
];

export const Expertise = () => {
    return (
        <section id="expertise" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade delay={0.1} inView>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase mb-6">
                            OUR EXPERTISE
                        </h2>
                        <p className="text-blue-200/60 max-w-2xl mx-auto text-lg font-medium">
                            Providing end-to-end solutions for ambitious brands ready to break through the noise.
                        </p>
                    </motion.div>
                </BlurFade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <BlurFade key={index} delay={0.2 + index * 0.1} inView>
                            <GlassCard
                                className="group transition-all duration-500 p-8 flex flex-col items-center text-center bg-black/40 backdrop-blur-3xl h-full border-white/5 hover:border-blue-500/30"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div className="p-4 rounded-full bg-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
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
