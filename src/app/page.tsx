"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Brandfolio } from "@/components/sections/Brandfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { KnowYourBrand } from "@/components/sections/KnowYourBrand";
import { Contact } from "@/components/sections/Contact";
import { Expertise } from "@/components/sections/Expertise";
import { CaseStudiesModal } from "@/components/ui/CaseStudiesModal";

export default function Home() {
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <KnowYourBrand />
      <Brandfolio onOpenCaseStudies={() => setIsCaseStudiesOpen(true)} />
      <Testimonials />
      <Contact />

      <CaseStudiesModal
        isOpen={isCaseStudiesOpen}
        onClose={() => setIsCaseStudiesOpen(false)}
      />
    </>
  );
}
