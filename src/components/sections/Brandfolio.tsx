"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { BlurFade } from "@/components/ui/BlurFade";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandfolioProps {
    onOpenCaseStudies: () => void;
    onOpenBlogs: () => void;
}

const categories = [
    { id: "all", name: "All Sectors" },
    { id: "igaming", name: "iGaming" },
    { id: "fitness", name: "Fitness" },
    { id: "automobiles", name: "Automobiles" },
    { id: "fmcg", name: "FMCG" },
    { id: "academy", name: "Academy" },
    { id: "ecommerce", name: "E-Commerce" }
];

const sectorMeta = {
    igaming: {
        tagline: "High-Conversion Acquisition & Retention Architecture for Licensed Operators.",
        stat: "3+ Operators • B2B & B2C Sites",
        desc: "We engineer customized player onboarding flows, registration optimization funnels, and high-performance marketing models for global brands."
    },
    fitness: {
        tagline: "Scalable Member Acquisition Systems & Hyper-Local Performance Campaigns.",
        stat: "3 Premium Gym Networks Scaled",
        desc: "We build high-converting landing pages for trial sign-ups, optimize local Meta search campaigns, and integrate automated email/SMS lead nurturing to drive monthly membership growth."
    },
    automobiles: {
        tagline: "Electric Vehicle Launches & International Mobility Campaigns.",
        stat: "JMEV Global Launch Execution",
        desc: "We coordinate localized social campaigns, digital electric vehicle (EV) dealership funnels, and target demographic data segmentations."
    },
    fmcg: {
        tagline: "High-Engagement Social Campaigns & Franchise Network Scale.",
        stat: "3 Client Networks Managed",
        desc: "From organic products to distribution networks, we build high-leverage local outreach campaigns and visual brand assets."
    },
    academy: {
        tagline: "Enrichment & Skill-Development Customer Acquisition Systems.",
        stat: "2 Major Institutions Scaled",
        desc: "We craft targeted enrollment acquisition frameworks, salon booking systems, and academy recruitment ads."
    },
    ecommerce: {
        tagline: "Precision Performance Marketing & Funnel Optimization for D2C Brands.",
        stat: "2 E-Commerce Systems Scaled",
        desc: "We design high-converting catalog grids, cart recovery triggers, and checkout optimization models."
    }
};

const portfolioItems = [
    {
        id: "vetoplay",
        category: "igaming",
        title: "Vetoplay",
        url: "https://www.vetoplay.com/",
        description: "Valora engineered strategic operator acquisition campaigns and B2B distribution funnels for this premium iGaming game developer. We optimized operator onboarding systems and platform integration flows.",
        stats: [
            { label: "Active Operators", value: "3+" },
            { label: "CPA Reduction", value: "-32%" },
            { label: "LTV Multiplier", value: "3.8X" }
        ]
    },
    {
        id: "jmev",
        category: "automobiles",
        title: "JMEV",
        url: "https://en.jmev.com/",
        description: "Architected the international marketing launch model for JMEV's electric vehicles in select global markets. Managed localized social campaigns, EV dealer leads, and demographic segment optimizations.",
        stats: [
            { label: "Reach", value: "192K+" },
            { label: "Leads Generated", value: "1,200+" },
            { label: "Impressions", value: "121K+" }
        ]
    },
    {
        id: "ramajeyam",
        category: "fmcg",
        title: "Rama Jeyam Rice",
        url: "https://www.ramajeyamrice.com/",
        description: "Implemented a regional brand expansion model for Rama Jeyam Rice, optimizing dealer connection rates and social engagement through localized high-conversion creatives.",
        stats: [
            { label: "Outlets", value: "250+" },
            { label: "ROI Yield", value: "4.8X" },
            { label: "CPL Optimization", value: "28%" }
        ]
    },
    {
        id: "tamilpaal",
        category: "fmcg",
        title: "Tamil Paal",
        url: "https://tamilpaal.com/",
        description: "Designed a subscription acquisition funnel for fresh farm-milk deliveries. Developed high-retention onboarding guides and managed local performance campaigns.",
        stats: [
            { label: "Acquisition", value: "2.4K+" },
            { label: "Retention Rate", value: "84%" },
            { label: "CAC Saved", value: "35%" }
        ]
    },
    {
        id: "authenticroyal",
        category: "fmcg",
        title: "Authentic Royal",
        url: "https://authenticroyal.com/",
        description: "Engineered premium export-oriented branding and trade campaigns. We optimized international B2B buyer lead funnels and designed aesthetic marketing catalogs.",
        stats: [
            { label: "B2B Leads", value: "450+" },
            { label: "Global Reach", value: "15+ Countries" },
            { label: "Brand Equity", value: "+40%" }
        ]
    },
    {
        id: "alliance",
        category: "academy",
        title: "Alliance Française de Madras",
        url: "https://madras.afindia.org/",
        description: "Developed localized recruitment campaign models and customized target segment setups for student course intakes. Optimized CPL by 40% using cultural marketing creatives.",
        stats: [
            { label: "Enrollment Leads", value: "1.2K+" },
            { label: "Course Intakes", value: "980+" },
            { label: "CAC Saved", value: "40%" }
        ]
    },
    {
        id: "nailsbeyond",
        category: "academy",
        title: "Nails n Beyond",
        url: "https://salons.nailsnbeyond.in/",
        description: "Spearheaded digital salon booking systems and franchise scale strategies. Created social-first nail academy enrollment ads and localized beauty promotions.",
        stats: [
            { label: "Bookings", value: "3.5K+" },
            { label: "Franchise Scale", value: "12+ Salons" },
            { label: "Social Followers", value: "10K+" }
        ]
    },
    {
        id: "bblunt",
        category: "ecommerce",
        title: "BBlunt",
        url: "https://bblunt.com/",
        description: "Engineered conversion-focused catalog ads and custom product recommendations. Optimized direct-to-consumer checkouts, driving higher cart value.",
        stats: [
            { label: "Click-Through", value: "3.4% CTR" },
            { label: "Ad ROAS", value: "4.2X" },
            { label: "CPA Saved", value: "28%" }
        ]
    },
    {
        id: "baka",
        category: "ecommerce",
        title: "Baka Store",
        url: "https://bakastore.in/",
        description: "Curated minimal aesthetic product catalog launches, setup cart recovery funnels, and optimized landing pages for anime merchandise, accessories, and movie-concept collectibles.",
        stats: [
            { label: "Orders", value: "1.8K+" },
            { label: "Conv. Rate", value: "4.1%" },
            { label: "Recovered Carts", value: "+18%" }
        ]
    },
    {
        id: "pinkfitness",
        category: "fitness",
        title: "Pink Fitness",
        url: "https://pinkfitness.in/",
        description: "Valora engineered localized lead generation funnels and targeted search acquisition campaigns for Pink Fitness, India's largest women-only fitness chain, significantly optimizing customer acquisition cost (CAC).",
        stats: [
            { label: "Leads Generated", value: "3.2K+" },
            { label: "CAC Reduction", value: "-24%" },
            { label: "Trial Conv. Rate", value: "18.5%" }
        ]
    },
    {
        id: "fitnessone",
        category: "fitness",
        title: "Fitness One",
        url: "https://fitnessone.in/",
        description: "Developed conversion-optimized membership drive landing pages and hyper-local Meta campaigns for this premier fitness network, driving high-volume trial requests and recurring enrollment growth.",
        stats: [
            { label: "Registrations", value: "5.8K+" },
            { label: "ROAS Multiplier", value: "4.5X" },
            { label: "Member Growth", value: "+38%" }
        ]
    },
    {
        id: "kgfitness",
        category: "fitness",
        title: "KG Fitness",
        url: "https://kgfitness.co.in/",
        description: "Designed high-converting web positioning and automated gym tour scheduling pipelines to route inbound leads directly to sales representatives, maximizing monthly membership close rates.",
        stats: [
            { label: "Tour Bookings", value: "1.4K+" },
            { label: "CPL Optimization", value: "22%" },
            { label: "Member Sign-ups", value: "+45%" }
        ]
    }
];

export const Brandfolio = ({ onOpenCaseStudies, onOpenBlogs }: BrandfolioProps) => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredItems = activeCategory === "all"
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    const activeMeta = activeCategory !== "all" ? sectorMeta[activeCategory as keyof typeof sectorMeta] : null;

    const getCategoryName = (catId: string) => {
        const found = categories.find(c => c.id === catId);
        return found ? found.name : catId;
    };

    return (
        <section id="brandfolio" className="py-24 relative overflow-hidden bg-transparent">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 gaming-grid opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 text-center">
                <BlurFade delay={0.1} inView>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic mb-6">
                        Brandfolio
                    </h2>
                </BlurFade>
            </div>

            {/* Premium Category Filter Tabs Bar */}
            <BlurFade delay={0.2} inView>
                <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 mb-12 max-w-5xl mx-auto px-4 z-10 relative">
                    {categories.map((category) => {
                        const isActive = activeCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "px-4 md:px-6 py-3 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase font-mono transition-all duration-300 relative border cursor-pointer",
                                    isActive
                                        ? "text-white border-slate-750 bg-brand-deep-blue/20 shadow-[0_4px_15px_rgba(0,0,0,0.35)]"
                                        : "text-brand-white/60 hover:text-white border-slate-800 bg-brand-deep-blue/5 hover:bg-slate-800/50"
                                )}
                            >
                                {category.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilterGlow"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </BlurFade>

            {/* Clients Simplified List: Horizontal Snap Swipe Carousel */}
            <div className="w-full relative overflow-hidden">
                <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-none pb-3 px-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0 w-[275px] snap-start"
                            >
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block"
                                >
                                    <GlassCard 
                                        className="p-5 h-[135px] flex flex-col justify-between bg-[#050b14]/70 hover:bg-[#08111e]/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl group transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.25)] relative overflow-hidden"
                                    >
                                        {/* Corner accent glow inside card */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-cyan/5 blur-xl pointer-events-none rounded-full" />
                                        
                                        <div className="flex flex-col gap-1 text-left relative z-10">
                                            <span className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">
                                                {getCategoryName(item.category)}
                                            </span>
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider font-sans group-hover:text-brand-cyan transition-colors leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <div className="flex justify-between items-center mt-3 border-t border-slate-900/40 pt-3.5 relative z-10">
                                            <span className="text-[9px] text-brand-white/40 font-mono uppercase tracking-widest flex items-center gap-1 group-hover:text-brand-cyan transition-colors">
                                                Launch Site <span className="text-[11px] font-sans">↗</span>
                                            </span>
                                            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-brand-cyan/40 group-hover:bg-[#060b14] transition-all">
                                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Micro Scroll Instruction */}
            <div className="text-center mt-2.5 mb-2">
                <span className="text-[8.5px] text-brand-white/30 font-mono tracking-widest uppercase animate-pulse">
                    ← Swipe to browse brandfolio →
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mt-16 flex flex-wrap justify-center gap-6">
                <BlurFade delay={0.5} inView>
                    <button
                        onClick={onOpenCaseStudies}
                        className="text-white bg-[#104E92]/20 hover:bg-[#104E92]/35 border border-[#104E92]/30 hover:border-white/80 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] px-10 py-4 rounded-full transition-all flex items-center gap-3 group font-bold tracking-widest uppercase text-sm italic font-mono cursor-pointer"
                    >
                        View Full Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </BlurFade>
                <BlurFade delay={0.5} inView>
                    <button
                        onClick={onOpenBlogs}
                        className="text-white bg-brand-orange/20 hover:bg-brand-orange/35 border border-brand-orange/30 hover:border-white/80 hover:shadow-[0_8px_25px_rgba(251,133,0,0.3)] px-10 py-4 rounded-full transition-all flex items-center gap-3 group font-bold tracking-widest uppercase text-sm italic font-mono cursor-pointer"
                    >
                        Read Performance Blogs <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </BlurFade>
            </div>
        </section>
    );
};
