"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { ArrowUpRight, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import NumberTicker from "@/components/ui/NumberTicker";
import { BlurFade } from "@/components/ui/BlurFade";

export const About = () => {
    return (
        <section id="about" className="py-32 relative text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <BlurFade delay={0.1} inView>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">
                            Our Philosophy
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
                            Visibility & Credibility
                        </h2>
                        <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
                            We believe that true growth comes from a perfect balance of being seen and being trusted.
                        </p>
                    </motion.div>
                </BlurFade>

                {/* Growth Metrics Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 px-4 py-12 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10">
                    <BlurFade delay={0.2} inView className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                            <NumberTicker value={100} className="text-white" />+
                        </div>
                        <div className="text-sm text-blue-300/60 uppercase tracking-widest">Clients Worldwide</div>
                    </BlurFade>
                    <BlurFade delay={0.3} inView className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                            <NumberTicker value={500} className="text-white" />+
                        </div>
                        <div className="text-sm text-blue-300/60 uppercase tracking-widest">Projects Completed</div>
                    </BlurFade>
                    <BlurFade delay={0.4} inView className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                            <NumberTicker value={98} className="text-white" />%
                        </div>
                        <div className="text-sm text-blue-300/60 uppercase tracking-widest">Retention Rate</div>
                    </BlurFade>
                    <BlurFade delay={0.5} inView className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                            <NumberTicker value={10} className="text-white" />x
                        </div>
                        <div className="text-sm text-blue-300/60 uppercase tracking-widest">Average ROI</div>
                    </BlurFade>
                </div>

                <BentoGrid className="grid-cols-1 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-[minmax(180px,auto)]">
                    {items.map((item, i) => (
                        <BlurFade key={i} delay={0.6 + i * 0.1} inView className={i === 0 || i === 3 ? "md:col-span-2" : ""}>
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                            />
                        </BlurFade>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

const items = [
    {
        title: "Strategic Vision",
        description: "We don't just execute tasks; we align every action with your long-term business goals.",
        header: <div className="flex-1 min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Data-Driven Decisions",
        description: "Every campaign is backed by real-time analytics and performance metrics.",
        header: <div className="flex-1 min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <TrendingUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Creative Excellence",
        description: "Design that captures attention and tells your story effectively.",
        header: <div className="flex-1 min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <CheckCircle className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Scalable Systems",
        description: "Building frameworks that grow with your business, ensuring sustainability.",
        header: <div className="flex-1 min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
        icon: <ArrowUpRight className="h-4 w-4 text-neutral-500" />,
    },
];
