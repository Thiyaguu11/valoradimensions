import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import GrowthModel from './components/GrowthModel'
import About from './components/About'
import Contact from './components/Contact'

function App() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Valora Dimensions",
        "image": "https://valoradimensions.vercel.app/logo.jpg",
        "@id": "https://valoradimensions.vercel.app",
        "url": "https://valoradimensions.vercel.app",
        "telephone": "+917338776815",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.0827,
            "longitude": 80.2707
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.instagram.com/valoradimensions/"
        ]
    };

    return (
        <div className="app">
            <Helmet>
                <title>Valora Dimensions | Performance Marketing & Brand Scaling Studio</title>
                <meta name="description" content="Valora Dimensions is a growth-focused marketing studio in Chennai. We specialize in ROI-driven performance marketing, strategy, and premium brand building." />

                {/* OpenGraph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://valoradimensions.vercel.app/" />
                <meta property="og:title" content="Valora Dimensions | Build Brands Meant to Scale" />
                <meta property="og:description" content="ROI-focused marketing and business consulting for brands ready to lead their market." />
                <meta property="og:image" content="https://valoradimensions.vercel.app/logo.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://valoradimensions.vercel.app/" />
                <meta property="twitter:title" content="Valora Dimensions | Build Brands Meant to Scale" />
                <meta property="twitter:description" content="ROI-focused marketing and business consulting for brands ready to lead their market." />
                <meta property="twitter:image" content="https://valoradimensions.vercel.app/logo.jpg" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <Navbar />
            <main>
                <Hero />
                <GrowthModel />
                <Services />
                <About />
                <Contact />
            </main>
            <footer style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-section-alt)' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</p>
                            <a href="mailto:valoradimensions@gmail.com" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>valoradimensions@gmail.com</a>
                        </div>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Valora Dimensions. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default App
