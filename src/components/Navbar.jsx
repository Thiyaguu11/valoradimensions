import React from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: isMobile ? '1rem' : '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '90%' : '95%',
            maxWidth: '1200px',
            zIndex: 1000,
            padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '50px'
        }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/logo.jpg" alt="Valora Dimensions" style={{ height: isMobile ? '35px' : '45px', borderRadius: '6px' }} />
            </div>

            {!isMobile && (
                <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <a href="#home" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Home</a>
                    <a href="#services" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Services</a>
                    <a href="#about" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>About</a>
                    <a href="#contact" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Contact</a>
                </div>
            )}

            <a href="#contact" className="btn-primary" style={{
                padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.5rem',
                borderRadius: '50px',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: 600
            }}>
                Get Started
            </a>
        </nav>
    )
}

export default Navbar
