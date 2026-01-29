import React from 'react'

const About = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="about" style={{ background: 'var(--bg-section-alt)', padding: '80px 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Our Expertise</span>
                        <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>We are not just marketers.</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Valora Dimensions is a technical powerhouse specializing in performance marketing and business consulting. We start with your numbers - margins, target customers, and scalability.
                        </p>
                        <div style={{
                            color: 'var(--text-secondary)',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '170px 1fr',
                            gap: isMobile ? '1.5rem' : '1.2rem',
                            marginTop: '2rem'
                        }}>
                            <div className="expertise-item" style={{ display: 'contents' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Business-First Approach:</span>
                                <span>We understand your model before we run an ad.</span>
                            </div>

                            <div className="expertise-item" style={{ display: 'contents' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Expansion-Focused:</span>
                                <span>Built to help you open more locations and enter new markets.</span>
                            </div>

                            <div className="expertise-item" style={{ display: 'contents' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Integrated Growth:</span>
                                <span>Combining paid performance with organic perception.</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '3rem', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '40px', height: '40px', borderTop: '2px solid var(--accent-color)', borderLeft: '2px solid var(--accent-color)' }}></div>
                        <h3 style={{ marginBottom: '1rem' }}>Who we work with</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                            • Brand owners in India ready for structured growth.<br />
                            • Businesses in Tier-2 markets targeting upper-middle class.<br />
                            • Owners prepared to invest ₹50,000+ monthly in marketing.
                        </p>
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ fontWeight: 600 }}>Located in Chennai</p>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Serving brands nationwide.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
