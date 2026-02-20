'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle anchor links
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a')
            if (target && target.hash && target.origin === window.location.origin) {
                const element = document.querySelector(target.hash)
                if (element) {
                    e.preventDefault()
                    lenis.scrollTo(element, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    })
                }
            }
        }

        document.addEventListener('click', handleAnchorClick)

        return () => {
            lenis.destroy()
            document.removeEventListener('click', handleAnchorClick)
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
