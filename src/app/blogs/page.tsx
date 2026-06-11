"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";
import blogsData from "../../../public/blogs/blogs_db.json";

// Mapped styling class for niches
const nicheColors: Record<string, string> = {
    igaming: "text-brand-orange bg-brand-orange/8 border-brand-orange/15",
    fitness: "text-brand-green bg-brand-green/8 border-brand-green/15",
    automobiles: "text-brand-cyan bg-brand-cyan/8 border-brand-cyan/15",
    fmcg: "text-brand-yellow bg-brand-yellow/8 border-brand-yellow/15",
    academy: "text-blue-500 bg-blue-500/8 border-blue-500/15",
    "e-commerce": "text-purple-500 bg-purple-500/8 border-purple-500/15",
};

interface Blog {
    id: number;
    niche: string;
    title: string;
    hook: string;
    wordCount: number;
    image1: string;
    image2: string;
    content: string;
}

export default function BlogsPage() {
    const [selectedNiche, setSelectedNiche] = useState<string>("all");
    const [activeBlogId, setActiveBlogId] = useState<number | null>(null);

    const nichesList = ["all", "igaming", "fitness", "automobiles", "fmcg", "academy", "e-commerce"];

    const filteredBlogs = selectedNiche === "all"
        ? (blogsData as Blog[])
        : (blogsData as Blog[]).filter(b => b.niche.toLowerCase().includes(selectedNiche));

    const activeBlog = (blogsData as Blog[]).find(b => b.id === activeBlogId);

    // Simple parser to render markdown to HTML cleanly
    const renderMarkdownContent = (md: string) => {
        let html = md;
        // Code blocks
        html = html.replace(/```([a-zA-Z]*)\n([\s\S]*?)\n```/g, '<pre class="bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px] md:text-xs p-4 rounded-xl overflow-x-auto my-4">$2</pre>');
        // Headers
        html = html.replace(/^# (.*?)$/gm, '<h1 class="text-xl md:text-3xl font-black text-slate-950 mt-8 mb-4 uppercase tracking-tight">$1</h1>');
        html = html.replace(/^## (.*?)$/gm, '<h2 class="text-lg md:text-xl font-bold text-slate-950 mt-6 mb-3 border-l-4 border-[#104E92] pl-3">$1</h2>');
        html = html.replace(/^### (.*?)$/gm, '<h3 class="text-base md:text-lg font-bold text-slate-950 mt-4 mb-2">$1</h3>');
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-[#104E92] border-b border-dashed border-[#104E92] hover:text-orange-600 transition-colors font-medium">$1</a>');
        // Table parsing
        html = html.replace(/\|([^|\n]+)/g, '<span class="px-2 py-1">$1</span>');
        
        // Paragraph splits
        return html.split("\n\n").map((p) => {
            if (p.trim().startsWith("<h") || p.trim().startsWith("<pre") || p.trim().startsWith("<span")) {
                return p;
            }
            return `<p class="mb-4 text-slate-700 text-xs md:text-sm leading-relaxed">${p.replace(/\n/g, "<br>")}</p>`;
        }).join("");
    };

    // Parser that injects images dynamically below the 2nd heading and before the last heading
    const renderMarkdownWithImages = (content: string, img1: string, img2: string) => {
        // First strip any existing inline markdown image lines to prevent duplication
        const cleanContent = content
            .split("\n")
            .filter((line) => !/^!\[.*?\]\(.*?\)/.test(line.trim()))
            .join("\n");

        const lines = cleanContent.split("\n");
        const headingIndices: number[] = [];
        
        lines.forEach((line, index) => {
            if (/^(#|##|###) /.test(line.trim())) {
                headingIndices.push(index);
            }
        });

        let modifiedLines = [...lines];
        
        // 1. Insert second image right before the last heading
        if (headingIndices.length >= 2) {
            const lastHeadingIdx = headingIndices[headingIndices.length - 1];
            const img2Html = `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"><img src="${img2}" alt="Article performance illustration" class="w-full h-auto object-cover max-h-[380px]" /></div>`;
            modifiedLines.splice(lastHeadingIdx, 0, "", img2Html, "");
        }
        
        // 2. Insert first image below the second heading (and after its first paragraph)
        if (headingIndices.length >= 2) {
            const secondHeadingIdx = headingIndices[1];
            
            // Find the end of the paragraph below the second heading
            let insertIdx = secondHeadingIdx + 1;
            while (insertIdx < modifiedLines.length && modifiedLines[insertIdx].trim() !== "" && !/^(#|##|###) /.test(modifiedLines[insertIdx].trim())) {
                insertIdx++;
            }
            
            const img1Html = `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"><img src="${img1}" alt="Article metrics preview" class="w-full h-auto object-cover max-h-[380px]" /></div>`;
            modifiedLines.splice(insertIdx, 0, "", img1Html, "");
        }

        const mdText = modifiedLines.join("\n");
        return renderMarkdownContent(mdText);
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 text-slate-800 relative font-sans">
            <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
                {/* ── HEADER ── */}
                <div className="text-center space-y-4">
                    <span className="text-brand-orange text-xs font-mono font-bold uppercase tracking-[0.25em] block">
                        Growth Library
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase italic text-slate-950 font-sans">
                        Performance Blogs
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Custom-written B2B/B2C conversion blogs mapping key pipeline tactics in iGaming, Fitness, Automobiles, FMCG, Academy, and E-Commerce.
                    </p>
                </div>

                {/* ── CONTAINER ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar Filters (3 cols) */}
                    <div className="lg:col-span-3 space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-250 pb-2 mb-3">
                            Filter by Niche
                        </h3>
                        <div className="flex flex-col gap-1.5">
                            {nichesList.map(niche => {
                                const isActive = selectedNiche === niche;
                                const count = niche === "all" 
                                    ? blogsData.length 
                                    : blogsData.filter(b => b.niche.toLowerCase().includes(niche)).length;
                                return (
                                    <button
                                        key={niche}
                                        onClick={() => setSelectedNiche(niche)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all duration-300 border cursor-pointer ${
                                            isActive
                                                ? "bg-[#104E92]/10 border-[#104E92]/30 text-[#104E92] font-bold"
                                                : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                    >
                                        <span className="capitalize">{niche.replace("-", " ")}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                            isActive ? "bg-[#104E92] text-white" : "bg-slate-200 text-slate-600"
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Blog Cards Grid (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-950 capitalize font-sans">
                                {selectedNiche.replace("-", " ")} Funnels
                            </h2>
                            <span className="text-xs font-mono text-slate-400">
                                Showing {filteredBlogs.length} articles
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredBlogs.map(blog => {
                                const nicheClass = nicheColors[blog.niche.toLowerCase()] || "text-slate-500 bg-slate-50 border-slate-200";
                                return (
                                    <div
                                        key={blog.id}
                                        onClick={() => setActiveBlogId(blog.id)}
                                        className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:border-slate-400 hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${nicheClass}`}>
                                                {blog.niche}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors line-clamp-2 uppercase font-sans">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed flex-grow">
                                            {blog.hook}
                                        </p>
                                        <div className="flex items-center justify-end text-xs font-mono text-slate-500 border-t border-slate-100 pt-3 mt-1">
                                            <span className="group-hover:text-brand-orange transition-colors flex items-center gap-1 font-bold">
                                                Read Solution &rarr;
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── READER MODAL ── */}
            {activeBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
                    <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-3xl p-8 md:p-12 relative shadow-2xl my-8 max-h-[85vh] overflow-y-auto text-slate-800">
                        {/* Close button */}
                        <button
                            onClick={() => setActiveBlogId(null)}
                            className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-lg cursor-pointer"
                        >
                            &times;
                        </button>

                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
                            {activeBlog.niche} Pipeline
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-950 mt-2 mb-6 leading-tight uppercase font-sans">
                            {activeBlog.title}
                        </h2>

                        {/* Article Body */}
                        <div 
                            className="reader-content text-slate-700 font-sans text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-6"
                            dangerouslySetInnerHTML={{ __html: renderMarkdownWithImages(activeBlog.content, activeBlog.image1, activeBlog.image2) }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
