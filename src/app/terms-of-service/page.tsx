"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.1}>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 text-center md:text-left">
                        Terms of Service
                    </h1>
                </BlurFade>

                <BlurFade delay={0.2}>
                    <div className="space-y-8 text-neutral-400 leading-relaxed font-medium">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the services of Valora Dimensions, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">2. Services</h2>
                            <p>
                                Valora Dimensions provides marketing strategy, digital design, and performance marketing services. We reserved the right to modify or discontinue any aspect of our services at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">3. User Obligations</h2>
                            <p>
                                You agree to provide accurate and complete information when engaging with our services and to use our platform and results in a lawful manner.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">4. Intellectual Property</h2>
                            <p>
                                All content, designs, and strategies developed by Valora Dimensions are protected by intellectual property laws. Reproduction or redistribution without explicit permission is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">5. Limitation of Liability</h2>
                            <p>
                                Valora Dimensions shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
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
