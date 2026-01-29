import React from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
    const [activeSection, setActiveSection] = React.useState('home')

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)

        const handleScroll = () => {
            const sections = ['home', 'services', 'about', 'contact']
            const current = sections.find(section => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 100 && rect.bottom >= 100
                }
                return false
            })
            if (current) setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <nav style={{
            position: 'fixed',
            top: isMobile ? '1rem' : '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '90%' : '95%',
            maxWidth: '1200px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '0.5rem 1rem' : '0.5rem 2rem',
        }}>
            {/* Left: Logo */}
            <div className="logo" style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                <a href="#home">
                    <img src="/logo.jpg" alt="Valora" style={{ height: isMobile ? '32px' : '40px', borderRadius: '8px' }} />
                </a>
            </div>

            {/* Center: Main Nav Pill */}
            {!isMobile && (
                <div style={{
                    display: 'flex',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    padding: '4px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    gap: '4px'
                }}>
                    {['home', 'services', 'about'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease',
                                color: activeSection === item ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.5)',
                                background: activeSection === item ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}

            {/* Right: Contact Action */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <a href="#contact" style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: isMobile ? '8px 16px' : '10px 24px',
                    borderRadius: '100px',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    transition: 'transform 0.2s ease'
                }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Contact
                </a>
            </div>
        </nav>
    )
}

export default Navbar
