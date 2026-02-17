import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Brandfolio } from "@/components/sections/Brandfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { KnowYourBrand } from "@/components/sections/KnowYourBrand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <KnowYourBrand />
      <Brandfolio />
      <Testimonials />
      <Contact />
    </>
  );
}
