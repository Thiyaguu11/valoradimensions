import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Brandfolio } from "@/components/sections/Brandfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { KnowYourBrand } from "@/components/sections/KnowYourBrand";
import { Contact } from "@/components/sections/Contact";
import { Expertise } from "@/components/sections/Expertise";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <KnowYourBrand />
      <Brandfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
