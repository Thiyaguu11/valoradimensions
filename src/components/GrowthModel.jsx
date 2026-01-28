import React from 'react'
import { motion } from 'framer-motion'

const growthStages = [
    {
        title: 'Content',
        description: 'Building a narrative that resonates with your target audience and establishes authority.'
    },
    {
        title: 'Awareness',
        description: 'Expanding reach through strategic distribution and organic growth tactics.'
    },
    {
        title: 'Performance',
        description: 'Direct response marketing focused on ROAS and scalable lead generation.'
    }
]

const GrowthModel = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scale = isMobile ? 0.7 : 1;

    return (
        <section id="growth-model" style={{ background: 'var(--bg-brand-green)' }}>
            <div className="container" style={{ overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem' }}>Our Growth Model</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        We've built a clear growth model that helps brands scale without confusion by aligning content, awareness, and performance.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: isMobile ? '350px' : '500px',
                    position: 'relative',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}>
                    {/* Inner Orbit (Increased to 220px) */}
                    <motion.div
                        style={{
                            width: '220px',
                            height: '220px',
                            border: '1px dashed var(--glass-border)',
                            borderRadius: '50%',
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Inner Items */}
                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className="glass"
                                    whileHover={{ backgroundColor: '#ffa800' }}
                                    style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap', cursor: 'default' }}
                                >
                                    Content
                                </motion.div>
                            </motion.div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className="glass"
                                    whileHover={{ backgroundColor: '#ffa800' }}
                                    style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap', cursor: 'default' }}
                                >
                                    Awareness
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Outer Orbit (Increased to 440px) */}
                    <motion.div
                        style={{
                            width: '440px',
                            height: '440px',
                            border: '1px dashed var(--glass-border)',
                            borderRadius: '50%',
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Outer Items */}
                        <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className="glass"
                                    whileHover={{ backgroundColor: '#ffa800' }}
                                    style={{ padding: '0.8rem 1.4rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', whiteSpace: 'nowrap', cursor: 'default' }}
                                >
                                    Performance
                                </motion.div>
                            </motion.div>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className="glass"
                                    whileHover={{ backgroundColor: '#ffa800' }}
                                    style={{ padding: '0.8rem 1.4rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', whiteSpace: 'nowrap', cursor: 'default' }}
                                >
                                    Scale
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Central Hub (Branding Logo) */}
                    <motion.div
                        className="glass"
                        whileHover={{ backgroundColor: '#ffa800', scale: 1.05 }}
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2,
                            border: '2px solid var(--glass-border)',
                            background: '#fff',
                            padding: '10px'
                        }}
                    >
                        <img src="/logo.jpg" alt="Core" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                    </motion.div>
                </div>

                <div style={{ marginTop: isMobile ? '2rem' : '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {growthStages.map((stage, index) => (
                        <motion.div
                            key={index}
                            className="glass"
                            style={{ padding: '2rem' }}
                            whileHover={{ y: -5, scale: 1.02, backgroundColor: '#ffa800', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{stage.title}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stage.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GrowthModel
