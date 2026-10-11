export default function KittyMode({ active, toast }) {
  return (
    <>
      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-[80] transition-all duration-700 ease-out ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase shadow-lg"
          style={{
            background: toast === 'on' ? '#ff4d8d' : '#262626',
            color: '#fff',
            boxShadow:
              toast === 'on'
                ? '0 10px 30px -8px rgba(255,77,141,0.55)'
                : '0 10px 30px -8px rgba(0,0,0,0.5)',
          }}
        >
          <span>{toast === 'on' ? '✨' : '×'}</span>
          <span>{toast === 'on' ? 'kitty mode on' : 'kitty mode off'}</span>
        </div>
      </div>

      {/* Floating kitty mascot (only when active) */}
      <div
        className={`fixed bottom-8 left-8 z-[70] pointer-events-none transition-all duration-1000 ease-out ${
          active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ animation: active ? 'float 8s ease-in-out infinite' : 'none' }}
        aria-hidden="true"
      >
        <KittyFace className="w-16 h-16 drop-shadow-lg" />
      </div>
    </>
  )
}

function KittyFace({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* ears */}
      <path d="M 18 42 L 12 14 L 40 30 Z" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 82 42 L 88 14 L 60 30 Z" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" strokeLinejoin="round" />
      {/* head */}
      <ellipse cx="50" cy="58" rx="40" ry="33" fill="#ffffff" stroke="#3d1f2f" strokeWidth="2" />
      {/* eyes */}
      <ellipse cx="36" cy="56" rx="4" ry="5" fill="#3d1f2f" />
      <ellipse cx="64" cy="56" rx="4" ry="5" fill="#3d1f2f" />
      {/* nose */}
      <ellipse cx="50" cy="66" rx="3.5" ry="2.5" fill="#ffc04d" />
      {/* whiskers */}
      <line x1="10" y1="60" x2="24" y2="58" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="66" x2="24" y2="66" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="72" x2="24" y2="74" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="60" x2="76" y2="58" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="66" x2="76" y2="66" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="90" y1="72" x2="76" y2="74" stroke="#3d1f2f" strokeWidth="1.6" strokeLinecap="round" />
      {/* bow */}
      <g transform="translate(74, 22) rotate(-15)">
        <path d="M 0 0 L -10 -7 L -10 7 Z" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M 0 0 L 10 -7 L 10 7 Z" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="2.5" fill="#ff4d8d" stroke="#3d1f2f" strokeWidth="1.6" />
      </g>
    </svg>
  )
}
