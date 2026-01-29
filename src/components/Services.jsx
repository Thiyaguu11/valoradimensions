import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Target, Users, BarChart } from 'lucide-react'

const serviceData = [
    {
        icon: <Target size={32} />,
        title: 'Lead Generation & Business Consulting',
        description: 'We partner with serious brand owners to align every rupee spent with clear business goals. From ad click to store visit/call.',
        tags: ['ROI Focused', 'Performance Marketing', 'Growth Advisory']
    },
    {
        icon: <Users size={32} />,
        title: 'Social Media Management',
        description: 'Building a solid organic presence that supports performance marketing. Content strategy, reels, posts, and engagement.',
        tags: ['Organic Growth', 'Brand Identity', 'Community Management']
    },
    {
        icon: <Rocket size={32} />,
        title: 'Brand Building & Strategy',
        description: 'Moving businesses from just running to seriously growing through premium visual identity and visibility.',
        tags: ['Brand Scaling', 'Market Expansion', 'Legacy Building']
    }
]

const Services = () => {
    return (
        <section id="services" style={{ background: 'var(--bg-brand-blue)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>What we do</span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Core Services</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '4rem'
                }}>
                    {serviceData.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass"
                            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            whileHover={{ y: -10, backgroundColor: '#ffa800', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div style={{ color: 'var(--accent-color)' }}>
                                {service.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{service.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                                {service.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', background: 'var(--accent-soft)', borderRadius: '50px', color: 'var(--text-secondary)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing/Budget Note */}
                <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Ready to scale?</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        We work with brands ready to invest in serious growth. Our performance model ensures we are fully aligned with your success.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Min. Monthly Ad Spend</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹50,000</p>
                        </div>
                        <div style={{ width: '1px', background: 'var(--glass-border)', display: 'block' }}></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Management Fee</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>30% <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#888' }}>of ad spend</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
