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
            top: isMobile ? '1.5rem' : '1.5rem',
            left: isMobile ? '1.5rem' : '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            width: isMobile ? 'auto' : 'calc(100% - 3rem)',
            maxWidth: '1200px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '0' : '0 1rem',
            background: 'transparent',
        }}>
            {/* Left: Logo */}
            <div className="logo" style={{ flex: isMobile ? 'none' : 1, display: 'flex', justifyContent: 'flex-start' }}>
                <a href="#home">
                    <img src="/logo.jpg" alt="Valora" style={{ height: isMobile ? '40px' : '45px', borderRadius: '8px', boxShadow: isMobile ? '0 4px 15px rgba(0,0,0,0.1)' : 'none' }} />
                </a>
            </div>

            {!isMobile && (
                <>
                    {/* Center: Main Nav Pill */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        padding: '4px',
                        borderRadius: '100px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        gap: '4px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                    }}>
                        {['home', 'services', 'about'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '100px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    color: activeSection === item ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    background: activeSection === item ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Right: Contact Action */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <a href="#contact" style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            padding: '10px 24px',
                            borderRadius: '100px',
                            background: 'var(--text-primary)',
                            color: '#fff',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            Contact
                        </a>
                    </div>
                </>
            )}
        </nav>
    )
}

export default Navbar
