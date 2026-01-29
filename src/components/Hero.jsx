import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Sparkle = ({ color, size, style }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 90, 180]
        }}
        transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
        }}
        style={{ position: 'absolute', ...style }}
    >
        <path
            d="M80 0C80 0 84.2846 41.297 101.569 58.5815C118.853 75.866 160 80 160 80C160 80 118.853 84.134 101.569 101.418C84.2846 118.703 80 160 80 160C80 160 75.7154 118.703 58.431 101.418C41.1466 84.134 0 80 0 80C0 80 41.1466 75.866 58.431 58.5815C75.7154 41.297 80 0 80 0Z"
            fill={color}
        />
    </motion.svg>
)

const Hero = () => {
    const sectionRef = useRef(null)
    const [images, setImages] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const frameCount = 167 // updated to 167 frames

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    })

    // Handle resize for mobile view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Smooth the scroll progress for a more "video-like" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1])

    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)

    // Preload images
    useEffect(() => {
        const loadedImages = []
        let loadedCount = 0

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            img.src = `/sequence/${i}.jpg`
            img.onload = () => {
                loadedCount++
                if (i === 0) setFirstFrameLoaded(true) // Show immediately when first frame is ready
                if (loadedCount === frameCount) {
                    setIsLoaded(true)
                }
            }
            loadedImages.push(img)
        }
        setImages(loadedImages)
    }, [])

    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        const unsubscribe = frameIndex.on('change', (latest) => {
            setCurrentFrame(Math.round(latest))
        })
        return () => unsubscribe()
    }, [frameIndex])

    // Content animations based on scroll
    const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0, 0])
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50])

    return (
        <section
            ref={sectionRef}
            id="home"
            style={{
                height: '110vh', /* EVEN TIGHTER */
                position: 'relative',
                background: '#fff'
            }}
        >
            {/* Sticky Container for the Image Sequence */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#fff'
            }}>
                {/* Background Image Sequence */}
                {images.length > 0 && (
                    <img
                        src={images[currentFrame]?.src}
                        alt="Sequence frame"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: firstFrameLoaded ? 1 : 0,
                            transition: 'opacity 0.2s ease-in-out'
                        }}
                    />
                )}

                {/* Overlay for Readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 100%)',
                    zIndex: 1
                }}></div>

                {/* Hero Content */}
                <div className="container" style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                    >
                        <span style={{
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 600,
                            marginBottom: '1rem',
                            display: 'block'
                        }}>Growth-Focused Marketing Studio</span>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}>
                            We build brands <br />
                            <span className="text-gradient">meant to scale.</span>
                        </h1>

                        <p style={{
                            maxWidth: '600px',
                            margin: '0 auto 2rem',
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)'
                        }}>
                            Valora Dimensions helps businesses look premium, market smarter, and grow faster through strategic marketing, design, and digital systems.
                        </p>

                        <div style={{ display: 'flex', gap: isMobile ? '0.6rem' : '1rem', justifyContent: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                            <a href="#contact" className="btn-primary" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: isMobile ? '0.6rem 1.1rem' : '0.8rem 1.5rem', // REDUCED ~25%
                                fontSize: isMobile ? '0.8rem' : '1rem'
                            }}>
                                Book a Strategy Call <ArrowRight size={isMobile ? 14 : 18} />
                            </a>
                            <a href="#services" className="glass" style={{
                                padding: isMobile ? '0.6rem 1.1rem' : '0.8rem 1.5rem', // REDUCED ~25%
                                borderRadius: '6px',
                                fontSize: isMobile ? '0.8rem' : '1rem'
                            }}>
                                Our Services
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
