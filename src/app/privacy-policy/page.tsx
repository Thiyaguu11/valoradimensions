"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.1}>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 text-center md:text-left">
                        Privacy Policy
                    </h1>
                </BlurFade>

                <BlurFade delay={0.2}>
                    <div className="space-y-8 text-neutral-400 leading-relaxed font-medium">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">1. Introduction</h2>
                            <p>
                                At Valora Dimensions, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">2. Information Collection</h2>
                            <p>
                                We collect information that you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or book a consultation. This may include your name, email address, phone number, and project details.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">3. Use of Information</h2>
                            <p>
                                We use the information we collect to provide and improve our services, communicate with you, and personalize your experience. We do not sell or share your personal information with third parties for their marketing purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">4. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">5. Changes to This Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>
                        </section>

                        <p className="pt-8 border-t border-white/10 text-sm italic">
                            Last updated: February 18, 2026
                        </p>
                    </div>
                </BlurFade>

                <BlurFade delay={0.3}>
                    <div className="mt-20 flex justify-center">
                        <Link
                            href="/#contact"
                            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all group shadow-xl"
                        >
                            <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </BlurFade>
            </div>
        </div>
    );
}
