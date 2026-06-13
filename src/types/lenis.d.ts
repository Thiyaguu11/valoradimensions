import type Lenis from "lenis";

declare global {
  interface Window {
    /** Active Lenis smooth-scroll instance, set by SmoothScroll provider (undefined when smooth scroll is disabled). */
    __lenis?: Lenis;
  }
}

export {};
