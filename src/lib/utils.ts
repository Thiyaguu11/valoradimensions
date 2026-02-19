import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  }
}
