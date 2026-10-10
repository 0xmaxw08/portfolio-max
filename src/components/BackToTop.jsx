import { useEffect, useState } from 'react'
import { getLenis } from '../lib/lenisInstance'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-40 group
        flex items-center gap-2 px-4 py-2.5 rounded-full
        font-mono text-[11px] tracking-wider uppercase
        border border-white/[0.10] bg-ink-900/70 backdrop-blur-md
        text-neutral-400 hover:text-neutral-100 hover:border-white/30
        transition-all duration-700 ease-out
        ${visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <span className="text-term transition-transform duration-500 group-hover:-translate-y-0.5">↑</span>
      <span>top</span>
    </button>
  )
}
