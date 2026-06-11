"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "panel" | "hero" | "hud" | "hud-orange";
}

export const GlassCard = ({
    children,
    className,
    variant = "default",
    ...props
}: GlassCardProps) => {
    return (
        <motion.div
            className={cn(
                "rounded-2xl border transition-all duration-300 relative",
                variant === "default" &&
                "glass-card hover:bg-brand-deep-blue/10 hover:border-brand-cyan/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
                variant === "panel" && "glass-panel bg-brand-black/40 border-brand-deep-blue/35",
                variant === "hero" && "glass-card bg-brand-deep-blue/5 backdrop-blur-3xl border-brand-cyan/20 shadow-[0_12px_50px_rgba(0,0,0,0.6)] rounded-3xl",
                variant === "hud" && "glass-panel bg-[#08111e]/90 border-brand-cyan/20 hover:border-brand-cyan/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
                variant === "hud-orange" && "glass-panel bg-[#08111e]/90 border-brand-orange/20 hover:border-brand-orange/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};
