import SparkleBurst from './SparkleBurst'
import KittyField from './KittyField'

export default function KittyMode({ active, toast, pulse }) {
  return (
    <>
      <KittyField active={active} />
      <SparkleBurst pulse={pulse} />

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-[110] transition-all duration-700 ease-out ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] tracking-[0.25em] uppercase shadow-lg"
          style={{
            background: toast === 'on' ? '#ff4d8d' : '#3d1f2f',
            color: '#ffffff',
            boxShadow:
              toast === 'on'
                ? '0 12px 40px -10px rgba(255,77,141,0.65)'
                : '0 12px 40px -10px rgba(0,0,0,0.55)',
          }}
        >
          <span>{toast === 'on' ? '✦' : '×'}</span>
          <span>{toast === 'on' ? 'kitty mode on' : 'kitty mode off'}</span>
          <span>{toast === 'on' ? '✦' : ''}</span>
        </div>
      </div>

      {/* Mascot */}
      <div
        className={`fixed bottom-8 left-8 z-[70] pointer-events-none transition-all duration-1000 ease-out ${
          active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        aria-hidden="true"
      >
        <div className="kitty-float">
          <div className="kitty-wiggle relative">
            <KittyFace className="w-20 h-20 drop-shadow-[0_8px_20px_rgba(255,105,180,0.35)]" />
            <div className="kitty-bubble">hi!</div>
            {/* Twinkles around the mascot */}
            <span className="kitty-twinkle" style={{ top: '-6px', left: '-8px', animationDelay: '0s' }}>✦</span>
            <span className="kitty-twinkle" style={{ top: '2px', right: '-12px', animationDelay: '0.9s' }}>✦</span>
            <span className="kitty-twinkle" style={{ bottom: '-4px', left: '2px', animationDelay: '1.7s' }}>✦</span>
          </div>
        </div>
      </div>
    </>
  )
}

function KittyFace({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 42 L 12 14 L 40 30 Z" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 82 42 L 88 14 L 60 30 Z" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="50" cy="58" rx="40" ry="33" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" />
      <ellipse cx="36" cy="56" rx="4" ry="5" fill="#3d1f2f" />
      <ellipse cx="64" cy="56" rx="4" ry="5" fill="#3d1f2f" />
      <ellipse cx="50" cy="66" rx="3.5" ry="2.5" fill="#ffc04d" />
      <line x1="10" y1="60" x2="24" y2="58" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="66" x2="24" y2="66" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="72" x2="24" y2="74" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="60" x2="76" y2="58" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="66" x2="76" y2="66" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="72" x2="76" y2="74" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <g transform="translate(74, 22) rotate(-15)">
        <path d="M 0 0 L -10 -7 L -10 7 Z" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M 0 0 L 10 -7 L 10 7 Z" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="2.5" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" />
      </g>
    </svg>
  )
}
