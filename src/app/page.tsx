import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Brandfolio } from "@/components/sections/Brandfolio";
import { KnowYourBrand } from "@/components/sections/KnowYourBrand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Brandfolio />
      <KnowYourBrand />
      <Contact />
    </>
  );
}
