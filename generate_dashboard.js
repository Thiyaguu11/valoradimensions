const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'public', 'blogs', 'blogs_db.json');
const outputPath = path.join(__dirname, 'public', 'blogs_dashboard.html');

try {
  if (!fs.existsSync(dbPath)) {
    throw new Error(`blogs_db.json not found at ${dbPath}`);
  }

  const blogs = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // HTML + CSS + JS template with embedded blogs database
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valora Dimensions | Performance Marketing Blog Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #030712;
            --card-bg: rgba(17, 24, 39, 0.55);
            --border-color: rgba(6, 182, 212, 0.15);
            --border-hover: rgba(251, 133, 0, 0.35);
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --brand-cyan: #06b6d4;
            --brand-orange: #fb8500;
            --gradient-brand: linear-gradient(135deg, var(--brand-cyan) 0%, var(--brand-orange) 100%);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(251, 133, 0, 0.04) 0%, transparent 40%);
        }

        header {
            padding: 2.5rem 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(3, 7, 18, 0.8);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 40;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo-section h1 {
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: -0.03em;
            background: linear-gradient(to right, #00f2fe, #4facfe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            font-style: italic;
        }

        .logo-section p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-family: monospace;
            margin-top: 0.2rem;
            letter-spacing: 0.05em;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
        }

        .btn {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-primary);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.6rem 1.2rem;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn:hover {
            background: rgba(6, 182, 212, 0.1);
            border-color: var(--brand-cyan);
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
        }

        .btn-primary {
            background: var(--brand-cyan);
            border-color: var(--brand-cyan);
            color: #030712;
        }

        .btn-primary:hover {
            background: #0891b2;
            border-color: #0891b2;
            color: #030712;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        }

        .container {
            display: flex;
            flex: 1;
            position: relative;
        }

        /* Sidebar Filter */
        .sidebar {
            width: 260px;
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            padding: 2rem 1.5rem;
            background: rgba(3, 7, 18, 0.4);
            flex-shrink: 0;
        }

        .sidebar-title {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-secondary);
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .filter-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .filter-btn {
            width: 100%;
            text-align: left;
            padding: 0.75rem 1rem;
            background: transparent;
            border: 1px solid transparent;
            color: var(--text-secondary);
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .filter-btn:hover {
            background: rgba(255, 255, 255, 0.03);
            color: var(--text-primary);
        }

        .filter-btn.active {
            background: rgba(6, 182, 212, 0.08);
            border-color: rgba(6, 182, 212, 0.2);
            color: var(--brand-cyan);
            font-weight: 600;
        }

        .filter-count {
            font-size: 0.75rem;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.1rem 0.5rem;
            border-radius: 9999px;
            color: var(--text-secondary);
        }

        .filter-btn.active .filter-count {
            background: var(--brand-cyan);
            color: #030712;
            font-weight: 700;
        }

        /* Main Content Grid */
        .main-content {
            flex: 1;
            padding: 2rem 3rem;
            overflow-y: auto;
        }

        .grid-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .grid-header h2 {
            font-size: 1.8rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }

        .blogs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }

        .blog-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .blog-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--brand-cyan);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .blog-card:hover {
            transform: translateY(-4px);
            border-color: var(--border-hover);
            box-shadow: 0 10px 30px rgba(251, 133, 0, 0.08);
        }

        .blog-card:hover::before {
            opacity: 1;
        }

        .blog-card-niche {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--brand-cyan);
            background: rgba(6, 182, 212, 0.08);
            padding: 0.25rem 0.6rem;
            border-radius: 4px;
            align-self: flex-start;
        }

        .blog-card-niche.igaming {
            color: var(--brand-orange);
            background: rgba(251, 133, 0, 0.08);
        }

        .blog-card-title {
            font-size: 1.15rem;
            font-weight: 800;
            line-height: 1.35;
            color: var(--text-primary);
            margin-top: 0.2rem;
        }

        .blog-card-hook {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
            flex-grow: 1;
        }

        .blog-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 1rem;
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: var(--text-secondary);
        }

        .word-count {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-family: monospace;
        }

        /* Reader Modal View */
        .reader-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(3, 7, 18, 0.95);
            backdrop-filter: blur(16px);
            z-index: 100;
            display: none;
            overflow-y: auto;
            padding: 2rem 1rem;
        }

        .reader-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(17, 24, 39, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 24px;
            padding: 3rem;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .close-btn {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        }

        .close-btn:hover {
            background: rgba(251, 133, 0, 0.1);
            border-color: var(--brand-orange);
            color: var(--brand-orange);
            transform: rotate(90deg);
        }

        .reader-niche {
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--brand-orange);
            margin-bottom: 1rem;
            display: inline-block;
        }

        .reader-title {
            font-size: 2.5rem;
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #fff 40%, var(--text-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .reader-meta {
            display: flex;
            gap: 1.5rem;
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 2.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding-bottom: 1.5rem;
            font-family: monospace;
        }

        .reader-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 2.5rem;
            background: rgba(255, 255, 255, 0.02);
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .reader-images {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }

        .reader-img-wrapper {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.08);
            aspect-ratio: 16 / 10;
        }

        .reader-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .reader-img-wrapper:hover img {
            transform: scale(1.03);
        }

        /* Blog Content Markdown Styling */
        .reader-content {
            font-size: 1.05rem;
            line-height: 1.75;
            color: #d1d5db;
        }

        .reader-content p {
            margin-bottom: 1.5rem;
        }

        .reader-content h2 {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-primary);
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            border-left: 4px solid var(--brand-cyan);
            padding-left: 0.8rem;
            letter-spacing: -0.01em;
        }

        .reader-content h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-top: 1.8rem;
            margin-bottom: 0.8rem;
        }

        .reader-content ul, .reader-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }

        .reader-content li {
            margin-bottom: 0.5rem;
        }

        .reader-content blockquote {
            background: rgba(6, 182, 212, 0.05);
            border-left: 4px solid var(--brand-cyan);
            padding: 1rem 1.5rem;
            border-radius: 4px;
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        .reader-content a {
            color: var(--brand-cyan);
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1px dashed var(--brand-cyan);
            transition: all 0.2s ease;
        }

        .reader-content a:hover {
            color: var(--brand-orange);
            border-bottom-color: var(--brand-orange);
            background: rgba(251, 133, 0, 0.05);
        }

        .reader-content strong {
            color: var(--text-primary);
            font-weight: 700;
        }

        .reader-content pre {
            background: #0d1117;
            padding: 1.2rem;
            border-radius: 12px;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.08);
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
        }

        .reader-content code {
            font-family: 'Fira Code', monospace;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9rem;
            color: #f3f4f6;
        }

        .reader-content pre code {
            background: transparent;
            padding: 0;
            font-size: 0.85rem;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-color);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--brand-cyan);
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            .sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .main-content {
                padding: 1.5rem 1rem;
            }
            .reader-container {
                padding: 1.5rem;
            }
            .reader-images {
                grid-template-columns: 1fr;
            }
            .reader-title {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>

    <header>
        <div class="logo-section">
            <h1>Valora Dimensions</h1>
            <p>VALORA_GROWTH_ENGINE_V2.0</p>
        </div>
        <div class="header-actions">
            <button class="btn btn-primary" onclick="downloadAllMetadata()">Download All (JSON)</button>
        </div>
    </header>

    <div class="container">
        <!-- Sidebar Filter -->
        <aside class="sidebar">
            <h3 class="sidebar-title">Niche Categories</h3>
            <ul class="filter-list">
                <li>
                    <button class="filter-btn active" onclick="filterNiche('all')">
                        <span>All Niches</span>
                        <span class="filter-count" id="count-all">20</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('igaming')">
                        <span>iGaming</span>
                        <span class="filter-count" id="count-igaming">10</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('fitness')">
                        <span>Fitness</span>
                        <span class="filter-count" id="count-fitness">2</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('automobiles')">
                        <span>Automobiles</span>
                        <span class="filter-count" id="count-automobiles">2</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('fmcg')">
                        <span>FMCG</span>
                        <span class="filter-count" id="count-fmcg">2</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('academy')">
                        <span>Academy</span>
                        <span class="filter-count" id="count-academy">2</span>
                    </button>
                </li>
                <li>
                    <button class="filter-btn" onclick="filterNiche('ecommerce')">
                        <span>E-Commerce</span>
                        <span class="filter-count" id="count-ecommerce">2</span>
                    </button>
                </li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="grid-header">
                <h2 id="active-niche-title">All Growth Blogs</h2>
                <span id="active-count-label" style="font-family: monospace; color: var(--text-secondary);">Showing 20 blogs</span>
            </div>
            
            <div class="blogs-grid" id="blogs-grid-container">
                <!-- Cards injected here -->
            </div>
        </main>
    </div>

    <!-- Reader Modal -->
    <div class="reader-modal" id="reader-modal">
        <div class="reader-container">
            <button class="close-btn" onclick="closeReader()">&times;</button>
            <span class="reader-niche" id="reader-niche">Niche</span>
            <h1 class="reader-title" id="reader-title">Blog Title</h1>
            
            <div class="reader-meta">
                <span>ID: #<span id="reader-id">1</span></span>
                <span>Word Count: <span id="reader-words">1200</span></span>
            </div>

            <div class="reader-actions">
                <button class="btn btn-primary" id="btn-dl-md">Download Markdown (.md)</button>
                <button class="btn" id="btn-dl-json">Download JSON (.json)</button>
                <button class="btn" id="btn-dl-html">Download HTML (.html)</button>
            </div>

            <div class="reader-images">
                <div class="reader-img-wrapper">
                    <img id="reader-img-1" src="" alt="Image 1">
                </div>
                <div class="reader-img-wrapper">
                    <img id="reader-img-2" src="" alt="Image 2">
                </div>
            </div>

            <div class="reader-content" id="reader-content-body">
                <!-- Content Markdown Parsed Injected Here -->
            </div>
        </div>
    </div>

    <script>
        // Embedded Blogs Database
        const blogsDb = ${JSON.stringify(blogs, null, 2)};

        // Initialize counts
        document.getElementById('count-all').innerText = blogsDb.length;
        document.getElementById('count-igaming').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'igaming').length;
        document.getElementById('count-fitness').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'fitness').length;
        document.getElementById('count-automobiles').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'automobiles').length;
        document.getElementById('count-fmcg').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'fmcg').length;
        document.getElementById('count-academy').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'academy').length;
        document.getElementById('count-ecommerce').innerText = blogsDb.filter(b => b.niche.toLowerCase() === 'ecommerce').length;

        // Render Blog Cards
        function renderCards(blogs) {
            const container = document.getElementById('blogs-grid-container');
            container.innerHTML = '';

            blogs.forEach(blog => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                card.onclick = () => openReader(blog.id);

                const nicheClass = blog.niche.toLowerCase() === 'igaming' ? 'igaming' : '';

                card.innerHTML = \`
                    <span class="blog-card-niche \${nicheClass}">\${blog.niche}</span>
                    <h3 class="blog-card-title">\${blog.title}</h3>
                    <p class="blog-card-hook">\${blog.hook}</p>
                    <div class="blog-card-footer">
                        <span class="word-count">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            \${blog.wordCount} words
                        </span>
                        <span>Read Blog &rarr;</span>
                    </div>
                \`;
                container.appendChild(card);
            });
        }

        // Filter Function
        function filterNiche(niche) {
            // Update active state in sidebar
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            let filtered = [];
            let title = 'All Growth Blogs';

            if (niche === 'all') {
                filtered = blogsDb;
                title = 'All Growth Blogs';
            } else {
                filtered = blogsDb.filter(b => b.niche.toLowerCase() === niche);
                title = niche.charAt(0).toUpperCase() + niche.slice(1) + ' Pipelines';
                if (niche === 'igaming') title = 'iGaming Revenue Pipelines';
                if (niche === 'ecommerce') title = 'E-Commerce Growth Systems';
            }

            document.getElementById('active-niche-title').innerText = title;
            document.getElementById('active-count-label').innerText = \`Showing \${filtered.length} blogs\`;
            renderCards(filtered);
        }

        // Minimal markdown rendering helper
        function renderMarkdown(md) {
            let html = md;
            
            // Code blocks
            html = html.replace(/\\\`\\\`\\\`([a-zA-Z]*)\\n([\\s\\S]*?)\\n\\\`\\\`\\\`/g, '<pre><code class="language-$1">$2</code></pre>');
            // Inline code
            html = html.replace(/\\\`([^\\\`\\n]+)\\\`/g, '<code>$1</code>');
            // Headers
            html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
            html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
            html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
            // Images (Markdown style: ![alt](url))
            html = html.replace(/\\!\\[([^\\]]*)\\]\\(([^\\)]*)\\)/g, '<div class="reader-content-img" style="margin: 2rem 0; border-radius: 12px; overflow:hidden; border: 1px solid rgba(255,255,255,0.08);"><img src=".$2" alt="$1" style="width:100%; display:block;"></div>');
            // Bold
            html = html.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
            // Links
            html = html.replace(/\\[([^\\]]+)\\]\\(([^\\)]+)\\)/g, '<a href="$2" target="_blank">$1</a>');
            // Paragraph breaks
            html = html.split('\\n\\n').map(p => {
                if (p.trim().startsWith('<h') || p.trim().startsWith('<pre') || p.trim().startsWith('<blockquote') || p.trim().startsWith('<div')) {
                    return p;
                }
                return \`<p>\${p.replace(/\\n/g, '<br>')}</p>\`;
            }).join('');

            return html;
        }

        // Open Reader Modal
        function openReader(id) {
            const blog = blogsDb.find(b => b.id === id);
            if (!blog) return;

            document.getElementById('reader-niche').innerText = blog.niche;
            document.getElementById('reader-title').innerText = blog.title;
            document.getElementById('reader-id').innerText = blog.id;
            document.getElementById('reader-words').innerText = blog.wordCount;
            
            // Handle images
            document.getElementById('reader-img-1').src = '.' + blog.image1;
            document.getElementById('reader-img-2').src = '.' + blog.image2;
            
            // Render content body
            document.getElementById('reader-content-body').innerHTML = renderMarkdown(blog.content);

            // Bind download actions
            document.getElementById('btn-dl-md').onclick = () => downloadFile(blog.title, blog.content, 'md');
            document.getElementById('btn-dl-json').onclick = () => downloadFile(blog.title, JSON.stringify(blog, null, 2), 'json');
            document.getElementById('btn-dl-html').onclick = () => {
                const fullHtml = \`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>\${blog.title}</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; background-color: #f9fafb; color: #111827; }
        h1 { font-size: 2.2rem; font-weight: 800; line-height: 1.2; }
        h2 { font-size: 1.5rem; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
        a { color: #0891b2; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
        pre { background: #1f2937; color: #f9fafb; padding: 15px; border-radius: 8px; overflow-x: auto; }
        code { font-family: monospace; background: #e5e7eb; padding: 2px 4px; border-radius: 4px; }
        pre code { background: transparent; padding: 0; }
    </style>
</head>
<body>
    <h1>\${blog.title}</h1>
    <p><em>Niche: \${blog.niche} | Word Count: \${blog.wordCount} words</em></p>
    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e5e7eb;">
    \${renderMarkdown(blog.content)}
</body>
</html>\`;
                downloadFile(blog.title, fullHtml, 'html');
            };

            document.getElementById('reader-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Close Reader Modal
        function closeReader() {
            document.getElementById('reader-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Download Helper
        function downloadFile(title, text, extension) {
            const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.' + extension;
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            
            const element = document.createElement('a');
            element.href = URL.createObjectURL(blob);
            element.download = filename;
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        // Download all database metadata
        function downloadAllMetadata() {
            downloadFile('valora_blogs_database', JSON.stringify(blogsDb, null, 2), 'json');
        }

        // Render initially
        renderCards(blogsDb);
    </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  console.log(`Successfully generated visual dashboard at ${outputPath}`);
} catch (error) {
  console.error('Error generating HTML dashboard:', error);
  process.exit(1);
}
