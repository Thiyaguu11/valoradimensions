"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { BlurFade } from "@/components/ui/BlurFade";

const portfolioItems = [
    {
        id: 1,
        image: "/brandfolio/1.png",
        title: "Fitness One - Outlets 95+ leads Generated 800+",
        description: "Fitness One is a premier wellness brand dedicated to making holistic fitness accessible to everyone. With a robust network of 95+ outlets, we provide state-of-the-art facilities and expert-led training. Having generated 800+ high-quality leads, our proven business model offers a lucrative opportunity for partners to tap into the booming health industry and inspire life-changing transformations."
    },
    {
        id: 2,
        image: "/brandfolio/2.png",
        title: "Fitness One - Outlets 95+ leads Generated 800+",
        description: "Fitness One is a premier wellness brand dedicated to making holistic fitness accessible to everyone. With a robust network of 95+ outlets, we provide state-of-the-art facilities and expert-led training. Having generated 800+ high-quality leads, our proven business model offers a lucrative opportunity for partners to tap into the booming health industry and inspire life-changing transformations."
    },
    {
        id: 3,
        image: "/brandfolio/3.png",
        title: "Karupati - Outlets 250+ leads Generated 1500+",
        description: "Karupatti Raja is a premier authentic South Indian brand specializing in healthy, palm-jaggery-infused beverages. Reviving traditional flavors, they have rapidly expanded to 250+ outlets, offering a chemical-free alternative to white sugar. With over 1,500 leads generated, this low-investment, high-margin franchise model is a proven success, empowering entrepreneurs while serving heritage-rich, organic snacks and coffee to a growing health-conscious community."
    },
    {
        id: 4,
        image: "/brandfolio/4.png",
        title: "Campaign Performance Analytics",
        description: "With a total spend of ₹27,457.63, the campaign successfully reached 192,830 people at an average CPC of ₹4.15. The 18–24 demographic emerged as the primary growth driver, delivering the highest reach and engagement. While the 25–34 group proved the most expensive, the 55–64 age bracket offered peak cost efficiency with a remarkable ₹1.46 CPC, optimizing overall performance."
    },
    {
        id: 5,
        image: "/brandfolio/5.png",
        title: "Mauritius Market Penetration",
        description: "With a strategic spend of ₹18,193.84, the campaign achieved a powerful localized reach of 38,379 unique accounts in Mauritius. Delivering 121,152 impressions at an impactful frequency of 3.16x, we ensured consistent brand visibility and top-of-mind awareness. This data-driven approach demonstrates a highly effective engagement strategy, turning digital impressions into a solid foundation for sustainable growth."
    }
];

export const Brandfolio = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="brandfolio" className="py-20 relative overflow-hidden">
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes juggle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes juggle-alt {
                    0%, 100% { transform: translateY(-20px); }
                    50% { transform: translateY(0); }
                }
                .marquee-container-fast {
                    display: flex;
                    width: max-content;
                    animation: marquee 50s linear infinite;
                }
                .marquee-container-slow {
                    display: flex;
                    width: max-content;
                    animation: marquee 80s linear infinite;
                }
                .marquee-container-fast:hover, .marquee-container-slow:hover {
                    animation-play-state: paused;
                }
                .juggle {
                    animation: juggle 6s ease-in-out infinite;
                }
                .juggle-alt {
                    animation: juggle-alt 6s ease-in-out infinite;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 text-center">
                <BlurFade delay={0.1} inView>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-6">
                        Brandfolio
                    </h2>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-4xl mx-auto">
                        <p className="text-blue-100/60 text-lg md:text-xl font-medium leading-relaxed">
                            At Valora Dimensions, we pride ourselves on delivering innovative marketing solutions that drive results. Our portfolio showcases a diverse range of successful projects that highlight our expertise in brand strategy, digital marketing, and design.
                        </p>
                    </div>
                </BlurFade>
            </div>

            {/* Row 1: Summary Cards (Horizontal Strips - Marquee) */}
            <div className="relative overflow-hidden w-full mb-8">
                <div className="marquee-container-fast flex gap-4 items-center">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-8 items-center">
                            {[
                                { num: 1, size: "h-[180px] md:h-[250px]" },
                                { num: 2, size: "h-[220px] md:h-[300px]" },
                                { num: 3, size: "h-[200px] md:h-[280px]" },
                                { num: 4, size: "h-[220px] md:h-[310px]" },
                                { num: 5, size: "h-[170px] md:h-[240px]" },
                                { num: 6, size: "h-[210px] md:h-[300px]" },
                                { num: 7, size: "h-[190px] md:h-[270px]" }
                            ].map((item, idx) => (
                                <div key={idx} className={`w-auto rounded-2xl overflow-hidden border border-white/5 bg-white/5 transition-transform duration-300 hover:scale-105 shrink-0 ${idx % 2 === 0 ? 'juggle' : 'juggle-alt'}`}>
                                    <img
                                        src={`/posters/${item.num}.png`}
                                        alt={`Summary ${item.num}`}
                                        className={`w-auto ${item.size} object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2: Portfolio Items with Descriptions - Auto-Scrolling */}
            <div className="relative w-full mt-8 overflow-hidden">
                <div className="relative z-10">
                    <div className="overflow-hidden">
                        <div className="marquee-container-slow flex gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex gap-6 shrink-0">
                                    {portfolioItems.map((item) => (
                                        <div key={`${i}-${item.id}`} className="flex gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-transform duration-500 hover:scale-105 w-[800px] shrink-0">
                                            {/* Image */}
                                            <div className="flex-shrink-0 w-[350px]">
                                                <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 h-full">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="text-white font-bold text-xl mb-4 leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-blue-100/70 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12 flex justify-center">
                <BlurFade delay={0.5} inView>
                    <button className="text-white bg-white/5 backdrop-blur-xl border border-white/10 px-10 py-4 rounded-full hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-3 group font-bold tracking-widest uppercase text-sm italic">
                        View Full Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </BlurFade>
            </div>
        </section>
    );
};
