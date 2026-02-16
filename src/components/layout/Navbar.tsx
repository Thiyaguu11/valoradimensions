"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Brandfolio", href: "#brandfolio" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                <Link
                    href="/"
                    className="z-50 flex items-center gap-3"
                >
                    <Image
                        src="/logo-new.jpg"
                        alt="Valora Logo"
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover border border-white/10"
                        priority
                    />
                    <span className="text-xl font-bold tracking-tighter text-white uppercase">
                        Valora Dimensions
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button className="bg-white/10 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/10">
                        Let's Talk
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-light text-white hover:text-blue-500 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
