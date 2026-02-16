import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { BlurFade } from "@/components/ui/BlurFade";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <BlurFade delay={0.1} inView className="col-span-1 md:col-span-2">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            VALORA<span className="text-blue-500">.</span>
                        </Link>
                        <p className="mt-4 text-neutral-400 max-w-sm">
                            We build digital experiences that move brands forward. Strategy, Design, and Development for the modern web.
                        </p>
                    </div>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                    <div>
                        <h4 className="font-medium text-white mb-6">Socials</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-neutral-400 hover:text-blue-400 transition-colors"
                                >
                                    <Instagram className="w-4 h-4 mr-2" /> Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-neutral-400 hover:text-blue-400 transition-colors"
                                >
                                    <Mail className="w-4 h-4 mr-2" /> Email
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-neutral-400 hover:text-blue-400 transition-colors"
                                >
                                    <Phone className="w-4 h-4 mr-2" /> WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </BlurFade>

                <BlurFade delay={0.3} inView>
                    <div>
                        <h4 className="font-medium text-white mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </BlurFade>
            </div>
            <div className="border-t border-white/5 mt-12 pt-8 text-center text-neutral-600 text-sm">
                © {new Date().getFullYear()} Valora Dimensions. All rights reserved.
            </div>
        </footer>
    );
}
