import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calendar, Mail, Phone } from 'lucide-react'

const Particle = ({ color, x, y, delay }) => (
    <motion.div
        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
        animate={{
            x: x,
            y: y,
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360],
            opacity: [1, 1, 0.8, 0]
        }}
        transition={{
            duration: 1.5 + Math.random(),
            delay: delay,
            ease: "easeOut"
        }}
        style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            zIndex: 100
        }}
    />
)

const Contact = () => {
    const [result, setResult] = React.useState("");
    const [status, setStatus] = React.useState("idle"); // idle, sending, success, error
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        setResult("Sending....");

        const formData = new FormData(event.target);
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // USER: Get your key at web3forms.com

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResult("Message sent successfully!");
                event.target.reset();
            } else {
                console.log("Error", data);
                setResult(data.message);
                setStatus("error");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setResult("Failed to send message. Please try again.");
            setStatus("error");
        }
    };

    return (
        <section id="contact">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
                    <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem' }}>Let's Scale Your Brand</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem' }}>Book a strategy call or send us a message to get started.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div className="glass" style={{ padding: '2.5rem' }}>
                        <h3 style={{ marginBottom: '2rem' }}>Get in Touch</h3>

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}
                            >
                                {/* Confetti burst from the center of the checkmark */}
                                <div style={{ position: 'absolute', top: '30%', left: '50%', pointerEvents: 'none' }}>
                                    {[...Array(50)].map((_, i) => {
                                        const angle = (i / 50) * Math.PI * 2 + (Math.random() * 0.5);
                                        const distance = 80 + Math.random() * 200;
                                        return (
                                            <Particle
                                                key={i}
                                                color={['#ffa800', '#3b82f6', '#10b981', '#ef4444', '#fecaca'][i % 5]}
                                                x={Math.cos(angle) * distance}
                                                y={Math.sin(angle) * distance - 20}
                                                delay={Math.random() * 0.15}
                                            />
                                        )
                                    })}
                                </div>

                                <div style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative', zIndex: 110 }}>✅</div>
                                <h4 style={{ marginBottom: '0.5rem' }}>Message Sent!</h4>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>We'll get back to you at valoradimensions@gmail.com very soon.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'var(--text-primary)', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <input name="name" type="text" placeholder="Name" required style={{ padding: '1rem', background: '#fff', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-primary)' }} />
                                <input name="email" type="email" placeholder="Email" required style={{ padding: '1rem', background: '#fff', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-primary)' }} />
                                <textarea name="message" placeholder="Tell us about your business" rows="4" required style={{ padding: '1rem', background: '#fff', border: '1px solid var(--glass-border)', borderRadius: '6px', color: 'var(--text-primary)' }}></textarea>

                                <button
                                    className="btn-primary"
                                    type="submit"
                                    disabled={status === "sending"}
                                    style={{ opacity: status === "sending" ? 0.7 : 1 }}
                                >
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                </button>

                                {status === "error" && (
                                    <p style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>{result}</p>
                                )}
                            </form>
                        )}

                        <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
                            Powered by Web3Forms
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass" style={{ padding: isMobile ? '1.2rem' : '1.5rem', display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem' }}>
                            <div style={{ padding: isMobile ? '0.7rem' : '1rem', background: 'var(--accent-soft)', borderRadius: '12px', flexShrink: 0 }}>
                                <MessageSquare color="#25D366" size={isMobile ? 20 : 24} />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.2rem' }}>WhatsApp</h4>
                                <a href="https://wa.me/917338776815" target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem' }}>Chat with us</a>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: isMobile ? '1.2rem' : '1.5rem', display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem' }}>
                            <div style={{ padding: isMobile ? '0.7rem' : '1rem', background: 'var(--accent-soft)', borderRadius: '12px', flexShrink: 0 }}>
                                <Calendar color="var(--text-primary)" size={isMobile ? 20 : 24} />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.2rem' }}>Strategy Call</h4>
                                <a href="https://calendly.com/valoradimensions" target="_blank" rel="noreferrer" style={{ fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem' }}>Book on Calendly</a>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: isMobile ? '1.2rem' : '1.5rem', display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem' }}>
                            <div style={{ padding: isMobile ? '0.7rem' : '1rem', background: 'var(--accent-soft)', borderRadius: '12px', flexShrink: 0 }}>
                                <Mail color="var(--text-primary)" size={isMobile ? 20 : 24} />
                            </div>
                            <div style={{ overflow: 'hidden', minWidth: 0 }}>
                                <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.2rem' }}>Email</h4>
                                <a
                                    href="mailto:valoradimensions@gmail.com"
                                    style={{
                                        fontWeight: 600,
                                        color: 'inherit',
                                        fontSize: isMobile ? '0.85rem' : '1rem',
                                        wordBreak: 'break-all',
                                        display: 'block'
                                    }}
                                >
                                    valoradimensions@gmail.com
                                </a>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', textAlign: isMobile ? 'center' : 'left' }}>
                            <p style={{ color: '#888', marginBottom: '1rem' }}>Follow us</p>
                            <a href="https://www.instagram.com/valoradimensions/" target="_blank" rel="noreferrer" className="glass" style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem', display: isMobile ? 'inline-block' : 'inline' }}>
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
