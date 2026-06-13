"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wires Lenis smooth scrolling into the live (Next.js) app.
 *
 * The site renders inside a phone-frame on desktop, where the real scroll
 * container is `.device-viewport` (overflow-y: auto) rather than the window.
 * On mobile (< 481px) the window/body scrolls. This provider picks the right
 * scroller, re-initialises when the layout crosses that breakpoint, and stays
 * disabled when the user prefers reduced motion.
 */
const DESKTOP_QUERY = "(min-width: 481px)";

export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const desktop = window.matchMedia(DESKTOP_QUERY);

        let lenis: Lenis | null = null;

        const stop = () => {
            lenis?.destroy();
            lenis = null;
            if (window.__lenis) delete window.__lenis;
        };

        const start = () => {
            stop();

            // Respect users who prefer reduced motion — keep native (instant) scroll.
            if (reduceMotion.matches) return;

            const isFramed = desktop.matches;
            const wrapper = isFramed
                ? document.querySelector<HTMLElement>(".device-viewport")
                : window;
            const content = isFramed
                ? document.querySelector<HTMLElement>("[data-lenis-content]")
                : document.documentElement;

            // If the framed scroll structure isn't present, fall back to native scroll.
            if (isFramed && (!wrapper || !content)) return;

            try {
                lenis = new Lenis({
                    wrapper: wrapper ?? window,
                    content: content ?? document.documentElement,
                    duration: 1.1,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    syncTouch: false,
                    touchMultiplier: 1.5,
                    wheelMultiplier: 1,
                    autoRaf: true,
                    // Let nested scroll areas (modals, dropdowns) handle their own wheel events.
                    prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
                });
                window.__lenis = lenis;
            } catch {
                stop();
            }
        };

        start();

        desktop.addEventListener("change", start);
        reduceMotion.addEventListener("change", start);

        return () => {
            desktop.removeEventListener("change", start);
            reduceMotion.removeEventListener("change", start);
            stop();
        };
    }, []);

    return null;
}
