"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Fitness One",
        testimonial: "Valora Dimensions has been a key growth partner structuring our funnel and helping us scale member acquisition profitably"
    },
    {
        name: "GAME ON",
        testimonial: "With Valora Dimensions, we generated 1,000+ leads and converted around 10% into paying customers. Their playbook became our real growth engine."
    },
    {
        name: "Green Gears",
        testimonial: "As a car dealership in Mauritius, we needed more qualified, ready-to-buy leads. With Valora Dimensions running our performance marketing, we’re now seeing a steady flow of serious enquiries for our cars."
    },
    {
        name: "Karupatti Raja",
        testimonial: "Valora Dimensions helped us build a scalable model and took full ownership of our social media. Our brand looks and feels sharper than ever"
    }
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade delay={0.1} inView>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic mb-6">
                            Client Stories
                        </h2>
                        <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" />
                    </div>
                </BlurFade>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, idx) => (
                        <BlurFade key={idx} delay={0.2 + idx * 0.1} inView>
                            <GlassCard className="p-8 h-full bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-blue-500/5 group-hover:text-blue-500/10 transition-colors" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <p className="text-blue-100/80 text-lg md:text-xl leading-relaxed mb-8 italic font-medium">
                                        "{t.testimonial}"
                                    </p>
                                    <div className="mt-auto flex items-center gap-4">
                                        <div className="w-10 h-1 rounded-full bg-blue-500" />
                                        <h4 className="text-white font-bold text-lg tracking-wide uppercase">
                                            {t.name}
                                        </h4>
                                    </div>
                                </div>
                            </GlassCard>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};
