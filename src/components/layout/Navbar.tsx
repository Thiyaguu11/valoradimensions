"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Expertise", href: "#expertise" },
    { name: "Services", href: "#know-your-brand" },
    { name: "Brandfolio", href: "#brandfolio" },
    { name: "Clients", href: "#testimonials" },
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
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
                                    className={cn(
                                        "text-[15.5px] font-medium transition-all duration-300 relative group py-2",
                                        isActive
                                            ? "text-blue-500"
                                            : "text-neutral-300 hover:text-blue-400"
                                    )}
                                >
                                    {item.name}
                                    {/* Active Indicator Dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
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
                        className={cn(
                            "hidden md:block px-5 py-2 rounded-full text-[15.5px] font-medium transition-all duration-300 border",
                            activeSection === "contact"
                                ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                : "bg-white/10 text-neutral-300 hover:bg-white/20 border-white/10"
                        )}
                    >
                        Let's Talk
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
                            className="absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                        >
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "text-2xl font-light transition-colors",
                                            isActive ? "text-blue-500 font-medium" : "text-white hover:text-blue-500"
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
