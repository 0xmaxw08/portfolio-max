import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../lib/lenisInstance'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Route all in-page anchor clicks through Lenis for smooth navigation
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') {
        e.preventDefault()
        lenis.scrollTo(0, { duration: 1.4 })
        return
      }
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    // Refresh triggers once layout settles (fonts, images, etc.)
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      document.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
