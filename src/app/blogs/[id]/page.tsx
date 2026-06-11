import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import blogsData from "../../../../public/blogs/blogs_db.json";

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

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return (blogsData as Blog[]).map((blog) => ({
        id: String(blog.id),
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const blog = (blogsData as Blog[]).find((b) => String(b.id) === id);
    if (!blog) {
        return {
            title: "Blog Not Found | Valora Dimensions",
            description: "The requested growth blog post could not be found.",
        };
    }

    return {
        title: `${blog.title} | Valora Dimensions Performance Blogs`,
        description: blog.hook,
        keywords: [
            blog.niche,
            "valora dimensions",
            "growth marketing",
            "lead generation",
            "conversion funnels",
            "digital advertising",
            "SEO optimization",
            "performance marketing"
        ],
        openGraph: {
            title: blog.title,
            description: blog.hook,
            images: [{ url: blog.image1 }],
        }
    };
}

const nicheColors: Record<string, string> = {
    igaming: "text-brand-orange bg-brand-orange/8 border-brand-orange/15",
    fitness: "text-brand-green bg-brand-green/8 border-brand-green/15",
    automobiles: "text-brand-cyan bg-brand-cyan/8 border-brand-cyan/15",
    fmcg: "text-brand-yellow bg-brand-yellow/8 border-brand-yellow/15",
    academy: "text-blue-400 bg-blue-400/8 border-blue-400/15",
    "e-commerce": "text-purple-400 bg-purple-400/8 border-purple-400/15",
};

// Markdown parser helper
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

export default async function BlogDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const blog = (blogsData as Blog[]).find((b) => String(b.id) === id);

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-slate-800 p-6">
                <h1 className="text-2xl font-mono font-bold text-brand-orange mb-4">404 - Blog Not Found</h1>
                <p className="text-slate-500 text-sm mb-6">The requested performance optimization article does not exist.</p>
                <Link href="/" className="px-6 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono uppercase font-bold text-slate-800 hover:bg-slate-100 transition-colors">
                    Back to Homepage
                </Link>
            </div>
        );
    }

    const colorClass = nicheColors[blog.niche.toLowerCase()] || "text-slate-500 bg-slate-50 border-slate-200";

    return (
        <article className="min-h-screen bg-white pt-36 pb-24 text-slate-800 relative font-sans">
            <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-8">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-slate-950 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                {/* Article Header block */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${colorClass}`}>
                            {blog.niche}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight uppercase leading-tight font-sans">
                        {blog.title}
                    </h1>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed border-l-2 border-brand-orange pl-4 italic">
                        {blog.hook}
                    </p>
                </div>

                {/* Markdown content container */}
                <div 
                    className="pt-6 border-t border-slate-150 font-sans leading-relaxed text-slate-700 text-xs md:text-sm"
                    dangerouslySetInnerHTML={{ __html: renderMarkdownWithImages(blog.content, blog.image1, blog.image2) }}
                />
            </div>
        </article>
    );
}
