import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (!element) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    // Route through Lenis so the programmatic scroll matches the smooth wheel feel.
    lenis.scrollTo(element, { offset: 0, duration: 1.2 });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
  window.history.pushState(null, "", href);
}
