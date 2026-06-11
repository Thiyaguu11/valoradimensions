"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Search, BookOpen, PlusCircle, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
import blogsData from "../../../public/blogs/blogs_db.json";

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

interface BlogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeBlogId: number | null;
    setActiveBlogId: (id: number | null) => void;
}

const nicheColors: Record<string, string> = {
    igaming: "text-brand-orange bg-brand-orange/8 border-brand-orange/15",
    fitness: "text-brand-green bg-brand-green/8 border-brand-green/15",
    automobiles: "text-brand-cyan bg-brand-cyan/8 border-brand-cyan/15",
    fmcg: "text-brand-yellow bg-brand-yellow/8 border-brand-yellow/15",
    academy: "text-blue-500 bg-blue-500/8 border-blue-500/15",
    "e-commerce": "text-purple-500 bg-purple-500/8 border-purple-500/15",
};

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    ctaText: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "Why do paid ad campaigns generate high clicks but fail to drive sales pipeline?",
        answer: "Programmatic networks optimize for volume. We bypass client-side pixels, integrating ad delivery with your CRM pipeline to capture only qualified leads, cutting ad waste by up to 40%.",
        ctaText: "Align Ad Spend"
    },
    {
        id: 2,
        question: "How do we stop wasting marketing budget on unverified leads and automated bots?",
        answer: "By executing instant serverless verification checks. Webhook cascades validate device footprints and database KYC status before ad attribution credits are released.",
        ctaText: "Secure Funnel"
    },
    {
        id: 3,
        question: "Why do standard CRM nurture pipelines fail to reactivate high-value players?",
        answer: "Legacy systems rely on slow 24-hour data updates. Reactivation requires real-time event brokers (like Kafka) to trigger automated incentives during active sessions.",
        ctaText: "Deploy CRM Loops"
    },
    {
        id: 4,
        question: "How can we scale our creative ad volume without running into legal delays?",
        answer: "We deploy an automated creative testing framework that generates dynamic, policy-compliant variations reviewed instantly by NLP auditing rules.",
        ctaText: "Scale Creatives"
    }
];

export const BlogsModal = ({ isOpen, onClose, activeBlogId, setActiveBlogId }: BlogsModalProps) => {
    const [blogsList, setBlogsList] = useState<Blog[]>([]);
    const [selectedNiche, setSelectedNiche] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    // FAQ State
    const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
    
    // Upload Form State
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [newNiche, setNewNiche] = useState<string>("iGaming");
    const [newTitle, setNewTitle] = useState<string>("Custom Growth Playbook");
    const [newHook, setNewHook] = useState<string>("How to implement this performance model.");
    const [newContent, setNewContent] = useState<string>("# Custom Growth Playbook\n\n### Introduction\nEnter details here...\n\n## The Strategic Problem\nEnter details here...\n\n### Conclusion\nSummary here.");
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    // Initialize in-memory blogs list on load
    useEffect(() => {
        setBlogsList(blogsData as Blog[]);
    }, []);

    const nichesList = ["all", "igaming", "fitness", "automobiles", "fmcg", "academy", "e-commerce"];

    // Filter blogs based on search query and selected niche
    const filteredBlogs = blogsList.filter((blog) => {
        const matchesNiche = selectedNiche === "all" || blog.niche.toLowerCase().includes(selectedNiche);
        const matchesSearch = 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.hook.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesNiche && matchesSearch;
    });

    const activeBlog = blogsList.find((b) => b.id === activeBlogId);

    // Handle Upload Blog Submit
    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newBlogItem: Blog = {
            id: blogsList.length + 1,
            niche: newNiche,
            title: newTitle,
            hook: newHook,
            wordCount: newContent.split(/\s+/).filter(Boolean).length,
            image1: "/images/blogs/blog_1_img1.svg",
            image2: "/images/blogs/blog_1_img2.svg",
            content: newContent
        };

        setBlogsList((prev) => [...prev, newBlogItem]);
        setUploadSuccess(true);
        
        setTimeout(() => {
            setUploadSuccess(false);
            setIsUploading(false);
            // Clear form
            setNewTitle("Custom Growth Playbook");
            setNewHook("How to implement this performance model.");
            setNewContent("# Custom Growth Playbook\n\n### Introduction\nEnter details here...\n\n## The Strategic Problem\nEnter details here...\n\n### Conclusion\nSummary here.");
        }, 1500);
    };

    // Standard markdown parser
    const renderMarkdownToHtml = (md: string) => {
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
        return renderMarkdownToHtml(mdText);
    };

    const getCleanNicheName = (catId: string) => {
        if (catId.toLowerCase().includes("gaming")) return "iGaming";
        if (catId.toLowerCase().includes("fitness")) return "Fitness";
        if (catId.toLowerCase().includes("auto")) return "Automobiles";
        if (catId.toLowerCase().includes("fmcg")) return "FMCG";
        if (catId.toLowerCase().includes("academy")) return "Academy";
        if (catId.toLowerCase().includes("commerce")) return "E-Commerce";
        return catId;
    };

    // Close modal and smooth scroll to contact section
    const handleCtaClick = () => {
        onClose();
        setTimeout(() => {
            const element = document.getElementById("contact");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 150);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.93, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 20 }}
                        transition={{ type: "spring", damping: 26, stiffness: 280 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-[0_32px_64px_rgba(15,23,42,0.15)] flex flex-col overflow-hidden z-10 text-slate-800"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">
                                    {isUploading ? "Upload Strategic Blog" : activeBlog ? "Growth Library" : "Growth & Performance Library"}
                                </h2>
                                <p className="text-slate-500 text-xs font-mono font-medium mt-1">
                                    {isUploading ? "Create and deploy a new conversion playbook" : activeBlog ? activeBlog.title : "Performance marketing analyses and conversion playbooks"}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Upload Button in list view */}
                                {!activeBlog && !isUploading && (
                                    <button
                                        onClick={() => setIsUploading(true)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#104E92] hover:bg-blue-600 text-white text-xs font-bold font-sans cursor-pointer transition-colors"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Upload Blog
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-all hover:rotate-90 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Body Container */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                {isUploading ? (
                                    /* ── UPLOAD BLOG FORM SCREEN ── */
                                    <motion.div
                                        key="upload"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                        className="max-w-2xl mx-auto space-y-6"
                                    >
                                        <button
                                            onClick={() => setIsUploading(false)}
                                            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                                        >
                                            <ArrowLeft className="w-4 h-4" /> Cancel Upload
                                        </button>

                                        {uploadSuccess ? (
                                            <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-slate-200 bg-slate-50 rounded-2xl">
                                                <CheckCircle2 className="w-12 h-12 text-brand-green animate-bounce" />
                                                <h3 className="text-lg font-bold uppercase tracking-wider font-mono">Blog Uploaded Successfully!</h3>
                                                <p className="text-slate-500 text-xs font-mono">Redirecting you to the library...</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleUploadSubmit} className="space-y-4 bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-800">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Niche / Industry</label>
                                                        <select
                                                            value={newNiche}
                                                            onChange={(e) => setNewNiche(e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#104E92] font-mono"
                                                        >
                                                            <option value="iGaming">iGaming</option>
                                                            <option value="Fitness">Fitness</option>
                                                            <option value="Automobiles">Automobiles</option>
                                                            <option value="FMCG">FMCG</option>
                                                            <option value="Academy">Academy</option>
                                                            <option value="E-Commerce">E-Commerce</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Blog Title</label>
                                                    <input
                                                        type="text"
                                                        value={newTitle}
                                                        onChange={(e) => setNewTitle(e.target.value)}
                                                        required
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#104E92] font-mono"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Hook (Meta Description)</label>
                                                    <input
                                                        type="text"
                                                        value={newHook}
                                                        onChange={(e) => setNewHook(e.target.value)}
                                                        required
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#104E92] font-mono"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Content (Markdown format)</label>
                                                    <textarea
                                                        rows={10}
                                                        value={newContent}
                                                        onChange={(e) => setNewContent(e.target.value)}
                                                        required
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#104E92] font-mono leading-relaxed"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full py-3.5 bg-[#104E92] hover:bg-blue-600 transition-all duration-300 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-md cursor-pointer"
                                                >
                                                    Publish Blog Post
                                                </button>
                                            </form>
                                        )}
                                    </motion.div>
                                ) : activeBlog ? (
                                    /* ── READER SCREEN (LIGHT THEME) ── */
                                    <motion.div
                                        key="reader"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white text-slate-800 -mx-6 md:-mx-8 -my-6 md:-my-8 p-6 md:p-12 space-y-6 min-h-full"
                                    >
                                        {/* Back Navigation Bar */}
                                        <button
                                            onClick={() => setActiveBlogId(null)}
                                            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                                        >
                                            <ArrowLeft className="w-4 h-4" /> Back to Articles
                                        </button>

                                        {/* Meta Title */}
                                        <div className="space-y-3 max-w-3xl mx-auto">
                                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${nicheColors[activeBlog.niche.toLowerCase()] || "text-slate-500 border-slate-200 bg-slate-50"}`}>
                                                {activeBlog.niche}
                                            </span>
                                            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight uppercase leading-tight font-sans">
                                                {activeBlog.title}
                                            </h1>
                                            <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed border-l-2 border-brand-orange pl-3 italic">
                                                {activeBlog.hook}
                                            </p>
                                        </div>

                                        {/* Content Render Body (Proper Alignment, Light Theme) */}
                                        <div 
                                            className="pt-6 border-t border-slate-100 font-sans leading-relaxed text-slate-700 max-w-3xl mx-auto text-xs md:text-sm"
                                            dangerouslySetInnerHTML={{ __html: renderMarkdownWithImages(activeBlog.content, activeBlog.image1, activeBlog.image2) }}
                                        />
                                    </motion.div>
                                ) : (
                                    /* ── LISTINGS SCREEN (TWO-COLUMN PORTAL WITH B2B SIDEBAR FAQ) ── */
                                    <motion.div
                                        key="listing"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Filters & Search Input Box */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                                            {/* Niche tabs */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {nichesList.map((niche) => {
                                                    const isActive = selectedNiche === niche;
                                                    return (
                                                        <button
                                                            key={niche}
                                                            onClick={() => setSelectedNiche(niche)}
                                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase transition-all border cursor-pointer ${
                                                                isActive
                                                                    ? "text-white border-[#104E92] bg-[#104E92]"
                                                                    : "text-slate-600 border-slate-200 bg-white hover:text-slate-900 hover:bg-slate-50"
                                                            }`}
                                                        >
                                                            {niche.replace("-", " ")}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Search input bar */}
                                            <div className="relative w-full md:max-w-xs">
                                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Search articles / keywords..."
                                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#104E92] font-mono transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Split Layout: Main Content (8 cols) + B2B Solvers Sidebar (4 cols) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                            {/* Left Column: Blogs Grid */}
                                            <div className="lg:col-span-8 space-y-4">
                                                <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-b border-slate-200 pb-2">
                                                    <span>Active Niche: <strong className="text-slate-800 uppercase">{selectedNiche.replace("-", " ")}</strong></span>
                                                    <span>Found: {filteredBlogs.length} articles</span>
                                                </div>

                                                {filteredBlogs.length > 0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        {filteredBlogs.map((blog) => {
                                                            const colorClass = nicheColors[blog.niche.toLowerCase()] || "text-slate-500 bg-slate-50 border-slate-200";
                                                            return (
                                                                <div
                                                                    key={blog.id}
                                                                    onClick={() => setActiveBlogId(blog.id)}
                                                                    className="flex flex-col bg-white border border-slate-200 hover:border-slate-350 hover:shadow-lg p-5 rounded-2xl transition-all duration-300 hover:scale-[1.01] h-full justify-between min-h-[200px] cursor-pointer group"
                                                                >
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between items-center">
                                                                            <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${colorClass}`}>
                                                                                {getCleanNicheName(blog.niche)}
                                                                            </span>
                                                                        </div>

                                                                        <h3 className="text-sm font-bold text-slate-950 uppercase group-hover:text-[#104E92] transition-colors line-clamp-2 leading-snug font-sans">
                                                                            {blog.title}
                                                                        </h3>

                                                                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3 font-light">
                                                                            {blog.hook}
                                                                        </p>
                                                                    </div>

                                                                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end items-center text-[9px] font-mono text-slate-500">
                                                                        <span className="group-hover:text-[#104E92] transition-colors font-extrabold uppercase tracking-wider flex items-center gap-1">
                                                                            Read Article <BookOpen className="w-3 h-3" />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                             );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="py-20 text-center border border-dashed border-slate-200 rounded-2xl">
                                                        <p className="text-slate-400 text-sm font-mono">No articles found matching your search filters.</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column: B2B Strategy Solvers Sidebar */}
                                            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono border-b border-slate-200 pb-2.5 flex items-center gap-1.5">
                                                    <HelpCircle className="w-4 h-4 text-[#104E92]" /> FAQ
                                                </h3>
                                                
                                                <div className="space-y-2">
                                                    {faqData.map((faq) => {
                                                        const isExpanded = expandedFaqId === faq.id;
                                                        return (
                                                            <div 
                                                                key={faq.id} 
                                                                className="border-b border-slate-200/60 pb-2 last:border-b-0 last:pb-0"
                                                            >
                                                                <button
                                                                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                                                                    className="w-full text-left py-2.5 flex items-center justify-between gap-3 focus:outline-none cursor-pointer group"
                                                                >
                                                                    <span className="font-bold text-xs text-slate-800 group-hover:text-[#104E92] group-hover:translate-x-1.5 transition-all duration-300 ease-out leading-snug inline-block">
                                                                        {faq.question}
                                                                    </span>
                                                                    <ChevronDown
                                                                        className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-350 ease-out group-hover:scale-110 ${
                                                                            isExpanded ? "rotate-180 text-[#104E92]" : ""
                                                                        }`}
                                                                    />
                                                                </button>
                                                                
                                                                <AnimatePresence initial={false}>
                                                                    {isExpanded && (
                                                                        <motion.div
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: "auto", opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                                                            className="overflow-hidden"
                                                                        >
                                                                            <div className="pb-3 pt-1 space-y-3">
                                                                                <p className="text-slate-600 text-[11px] leading-relaxed">
                                                                                    {faq.answer}
                                                                                </p>
                                                                                <button
                                                                                    onClick={handleCtaClick}
                                                                                    className="inline-flex items-center gap-1 bg-[#104E92] hover:bg-blue-600 text-white text-[9px] font-black py-1.5 px-3 rounded-lg transition-colors uppercase tracking-wider cursor-pointer font-sans"
                                                                                >
                                                                                    {faq.ctaText} &rarr;
                                                                                </button>
                                                                            </div>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
