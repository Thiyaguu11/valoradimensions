"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "panel" | "hero";
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
                "rounded-2xl border transition-all duration-300",
                variant === "default" &&
                "glass-card hover:bg-white/10 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
                variant === "panel" && "glass-panel bg-black/20 border-white/5",
                variant === "hero" && "glass-card bg-white/5 backdrop-blur-3xl border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] rounded-3xl",
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
