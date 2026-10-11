import { useMemo } from 'react'

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

const COLORS = ['#ffb8d0', '#ff8ab3', '#ff69b4', '#ffd6e5', '#ff4d8d']

export default function KittyField({ active }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: -Math.random() * 14,
        duration: 9 + Math.random() * 11,
        kind: Math.random() < 0.42 ? 'heart' : Math.random() < 0.6 ? 'star' : 'sparkle',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    []
  )

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden" aria-hidden="true">
      {particles.map((p) => {
        const Comp = p.kind === 'heart' ? Heart : p.kind === 'star' ? Star : SparkleShape
        return (
          <div
            key={p.id}
            className="kitty-field-particle"
            style={{
              left: p.left + '%',
              top: p.top + '%',
              width: p.size,
              height: p.size,
              color: p.color,
              animationDelay: p.delay + 's',
              animationDuration: p.duration + 's',
            }}
          >
            <Comp className="w-full h-full" />
          </div>
        )
      })}
    </div>
  )
}
