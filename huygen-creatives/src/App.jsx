import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LiquidGlass from './components/LiquidGlass'
import ParticlePathHero from './components/ParticlePathHero'
import GallerySection from './components/GallerySection'
import CinematicEnterOverlay from './components/CinematicEnterOverlay'
import useGsapSmoothScroll from './hooks/useGsapSmoothScroll'
import { audioManager } from './lib/audioManager'
import './index.css'

function App() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [is404, setIs404] = useState(false)

  // Disable scroll restoration and check route
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    // Force top scroll position on fresh load
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    const path = window.location.pathname
    if (path !== '/' && path !== '/index.html') {
      setIs404(true)
    }
  }, [])

  // Play 404 sound once on mount if on 404 route
  useEffect(() => {
    if (is404) {
      audioManager.play404()
    }
  }, [is404])

  // Global click pop and hover tick SFX bindings
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target
      if (!target) return
      const interactive = target.closest('button, a, [role="button"], .gallery-pill, .sv')
      if (interactive) {
        audioManager.playPop()
      }
    }

    let lastHoveredElement = null
    const handleGlobalMouseOver = (e) => {
      const target = e.target
      if (!target) return
      const interactive = target.closest('button, a, [role="button"], .gallery-pill, .sv')
      if (interactive && interactive !== lastHoveredElement) {
        audioManager.playHover()
        lastHoveredElement = interactive
      } else if (!interactive) {
        lastHoveredElement = null
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalMouseOver)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalMouseOver)
    }
  }, [])

  // Initialize smooth scroll when preloader ends
  useGsapSmoothScroll({ enabled: entered && !is404 })

  // Lock scroll during preloader
  useEffect(() => {
    if (!entered || is404) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [entered, is404])

  // Force scroll to top on entered transition
  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }, [entered])

  const toggleAudio = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (isPlaying) {
      audioManager.stopMusicFadeOut()
      setIsPlaying(false)
    } else {
      audioManager.startMusicFadeIn()
      setIsPlaying(true)
    }
  }

  // Premium Widescreen 404 Page
  if (is404) {
    return (
      <main className="w-full h-screen bg-[#05010a] flex items-center justify-center relative overflow-hidden select-none">
        {/* Glow backdrop */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#ab71f8]/10 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] font-bold text-[#ab71f8] leading-none mb-4 select-none filter drop-shadow-[0_0_35px_rgba(171,113,248,0.45)]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            404
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 font-mono text-sm tracking-[0.16em] uppercase mb-8"
          >
            Lost in the creatives void
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <LiquidGlass className="rounded-[100px] pointer-events-auto" color="white" chromaticAberration={2} blur={16} button>
              <a href="/" className="px-10 py-4 text-xs font-mono tracking-[0.12em] text-white uppercase block">
                Return to Universe
              </a>
            </LiquidGlass>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full bg-black">
      {/* Preloader overlay */}
      <CinematicEnterOverlay
        onEnter={() => {
          setEntered(true)
          setIsPlaying(true)
        }}
      />

      {/* Unified Cinematic Mask Reveal Bars (fixed viewport overlay) */}
      <motion.div 
        initial={{ y: 0 }}
        animate={entered ? { y: '-42.5vh' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 w-full h-[50.5vh] bg-black z-[45] pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <motion.div 
        initial={{ y: 0 }}
        animate={entered ? { y: '42.5vh' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed bottom-0 left-0 w-full h-[50.5vh] bg-black z-[45] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Section 1: Hero */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <ParticlePathHero debugPath={false} isEntered={entered} />
        
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="navbar absolute top-[8vh] w-full z-50"
        >
          <a href="https://www.huygenstudios.com/" className="creatives-brand" aria-label="Huygen Studios home">
            <picture>
              <source media="(max-width: 767px)" srcSet="https://www.huygenstudios.com/Huygen%20Studios%20logo%20white%20vertical.png" />
              <img src="https://www.huygenstudios.com/Huygen%20Studios%20logo%20white%20horizontal.png" alt="Huygen Studios" />
            </picture>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="https://www.huygenstudios.com/services">Services</a>
            <a href="https://www.huygenstudios.com/contact">Contact</a>
            <button type="button" onClick={toggleAudio}>Sound [{isPlaying ? 'ON' : 'OFF'}]</button>
          </div>
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="layer-ui absolute bottom-[8vh] left-0 w-full z-50 pointer-events-none"
        >
          <div className="bottom-content flex justify-between items-end w-full pointer-events-none">
            <p className="subtitle text-white/50 text-[1.05rem] max-w-[340px] select-none pointer-events-auto font-medium">
              Mind-bending websites, smooth SaaS animations, and creative digital products.
            </p>
            
            <LiquidGlass className="rounded-[100px] pointer-events-auto" color="white" chromaticAberration={2} blur={16} button>
              <a href="mailto:hello@huygenstudios.com" className="px-12 py-5 text-[1.1rem] text-white font-medium block">
                Start a project
              </a>
            </LiquidGlass>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Sphere/Grid Gallery */}
      <section id="work" className="relative w-full h-screen overflow-hidden bg-black">
        <GallerySection isPlaying={isPlaying} toggleAudio={toggleAudio} />
      </section>
    </main>
  )
}

export default App
