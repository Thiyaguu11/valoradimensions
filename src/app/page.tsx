"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Brandfolio } from "@/components/sections/Brandfolio";
import { KnowYourBrand } from "@/components/sections/KnowYourBrand";
import { Contact } from "@/components/sections/Contact";
import { Expertise } from "@/components/sections/Expertise";
import { CaseStudiesModal } from "@/components/ui/CaseStudiesModal";
import { BlogsModal } from "@/components/ui/BlogsModal";

export default function Home() {
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#blogs") {
        setIsBlogsOpen(true);
      }
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleCloseBlogs = () => {
    setIsBlogsOpen(false);
    setActiveBlogId(null);
    if (window.location.hash === "#blogs") {
      // Remove hash from address bar cleanly without page jumps
      window.history.pushState(window.history.state || {}, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <KnowYourBrand />
      <Brandfolio 
        onOpenCaseStudies={() => setIsCaseStudiesOpen(true)} 
        onOpenBlogs={() => setIsBlogsOpen(true)} 
      />
      <Contact />

      <CaseStudiesModal
        isOpen={isCaseStudiesOpen}
        onClose={() => setIsCaseStudiesOpen(false)}
      />

      <BlogsModal
        isOpen={isBlogsOpen}
        onClose={handleCloseBlogs}
        activeBlogId={activeBlogId}
        setActiveBlogId={setActiveBlogId}
      />
    </>
  );
}
