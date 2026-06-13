"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn, scrollToSection } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#expertise" },
    { name: "Know Your Brand", href: "#know-your-brand" },
    { name: "Brandfolio", href: "#brandfolio" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Intersection Observer for active section
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Track all sections defined in navItems
        navItems.forEach((item) => {
            const sectionId = item.href.replace("#", "");
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-[var(--navbar-top,0px)] left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-black/50 backdrop-blur-md border-white/10 py-3"
                    : "bg-transparent py-6"
            )}
        >
            <div className="w-full px-8 flex items-center justify-between">
                {/* Left: Logo & Name */}
                <div className="flex-1 flex justify-start">
                    <Link
                        href="/"
                        className="z-50 flex items-center gap-3 group"
                    >
                        <Image
                            src="/updatedvalora.png"
                            alt="Valora Logo"
                            width={150}
                            height={44}
                            className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
                            priority
                        />
                    </Link>
                </div>

                {/* Center: Nav Links */}
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.replace("#", "");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.href === "#blogs") {
                                            e.preventDefault();
                                            window.location.hash = "#blogs";
                                            return;
                                        }
                                        scrollToSection(e, item.href);
                                    }}
                                    className={cn(
                                        "text-[15.5px] font-medium transition-all duration-300 relative group py-2",
                                        isActive
                                            ? "text-brand-cyan"
                                            : "text-neutral-300 hover:text-brand-cyan/85"
                                    )}
                                >
                                    {item.name}
                                    {/* Active Indicator Dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-cyan rounded-full shadow-[0_0_8px_rgba(0,168,232,0.6)]"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 flex justify-end items-center gap-6">
                    <Link
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "#contact")}
                        className={cn(
                            "hidden md:block px-6 py-2 rounded-full text-[15.5px] font-bold transition-all duration-300 border font-mono uppercase tracking-wider text-xs",
                            activeSection === "contact"
                                ? "bg-brand-orange text-white border-brand-orange shadow-[0_0_20px_rgba(251,133,0,0.4)]"
                                : "bg-brand-deep-blue/20 text-neutral-300 hover:bg-brand-cyan/15 hover:text-white border-brand-cyan/30"
                        )}
                    >
                        Let&apos;s Talk
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                        >
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => {
                                            setMobileMenuOpen(false);
                                            if (item.href === "#blogs") {
                                                e.preventDefault();
                                                window.location.hash = "#blogs";
                                                return;
                                            }
                                            scrollToSection(e, item.href);
                                        }}
                                        className={cn(
                                            "text-2xl font-light transition-colors uppercase font-mono tracking-wider",
                                            isActive ? "text-brand-cyan font-bold" : "text-white hover:text-brand-cyan"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
