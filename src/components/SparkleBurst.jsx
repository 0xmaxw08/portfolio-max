import { useEffect, useState } from 'react'

const Star = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0 L13.5 10 L24 12 L13.5 14 L12 24 L10.5 14 L0 12 L10.5 10 Z" />
  </svg>
)
const Heart = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)
const SparkleShape = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z" />
  </svg>
)

const COLORS = ['#ff4d8d', '#ff8ab3', '#ffb8d0', '#ffffff', '#ff69b4', '#e8336d']

export default function SparkleBurst({ pulse }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!pulse) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const count = 70
    const batch = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const distance = 220 + Math.random() * 460
      return {
        id: pulse + '-' + i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 8 + Math.random() * 16,
        delay: Math.random() * 0.18,
        duration: 1.1 + Math.random() * 0.8,
        kind: Math.random() < 0.38 ? 'heart' : Math.random() < 0.55 ? 'star' : 'sparkle',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })
    setParticles(batch)
    const t = setTimeout(() => setParticles([]), 2400)
    return () => clearTimeout(t)
  }, [pulse])

  if (!particles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[95]" aria-hidden="true">
      {/* Two shockwave rings */}
      <div className="kitty-shockwave" key={'ring-a-' + pulse} />
      <div className="kitty-shockwave kitty-shockwave--delay" key={'ring-b-' + pulse} />

      {/* Radial sparkle burst */}
      <div className="absolute left-1/2 top-1/2">
        {particles.map((p) => {
          const Comp = p.kind === 'heart' ? Heart : p.kind === 'star' ? Star : SparkleShape
          return (
            <div
              key={p.id}
              className="sparkle-burst-particle"
              style={{
                '--dx': p.dx + 'px',
                '--dy': p.dy + 'px',
                '--size': p.size + 'px',
                '--dur': p.duration + 's',
                '--delay': p.delay + 's',
                color: p.color,
              }}
            >
              <Comp className="w-full h-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
