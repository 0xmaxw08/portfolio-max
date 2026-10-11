import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const FULL_NAME = 'Manvendra Snehasish'
const SHORT_NAME = 'max'

export default function Hero() {
  const sectionRef = useRef(null)
  const statusRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)
  const graphicRef = useRef(null)

  const [displayed, setDisplayed] = useState('')

  // GSAP intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(statusRef.current, { y: 20, opacity: 0, duration: 1 })
        .from(nameRef.current, { y: 40, opacity: 0, duration: 1 }, '-=0.6')
        .from(taglineRef.current, { y: 30, opacity: 0, duration: 1.2 }, '-=0.9')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 1.2 }, '-=0.9')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 1 }, '-=0.8')
        .from(graphicRef.current, { scale: 0.92, opacity: 0, duration: 1.6 }, '-=1.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Smooth RAF-driven typewriter loop
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplayed(SHORT_NAME)
      return
    }

    let raf
    let cancelled = false
    const start = performance.now()

    // Per-character speed in ms, plus a jitter factor to avoid robotic timing
    const CHARS_PER_MS_FULL = 1 / 105  // ~105ms per char
    const CHARS_PER_MS_BACK = 1 / 42   // ~42ms per char (backspace feels faster)
    const CHARS_PER_MS_SHORT = 1 / 190 // ~190ms per char ("max" is deliberate)

    // Timeline plan (all in ms, relative to loop start)
    //  0      – 1100  : type full name
    //  1100   – 3400  : hold
    //  3400   – 4400  : backspace full name
    //  4400   – 4650  : beat
    //  4650   – 4950  : type "max"
    //  4950   – 6650  : hold
    //  6650   – 6950  : backspace "max"
    //  6950   – 7150  : beat, then loop
    const PHASE = {
      typeFull:    { start: 0,    duration: FULL_NAME.length / CHARS_PER_MS_FULL },
      holdFull:    { start: null, duration: 3200 },
      backFull:    { start: null, duration: FULL_NAME.length / CHARS_PER_MS_BACK },
      beat1:       { start: null, duration: 400 },
      typeShort:   { start: null, duration: SHORT_NAME.length / CHARS_PER_MS_SHORT },
      holdShort:   { start: null, duration: 2800 },
      backShort:   { start: null, duration: SHORT_NAME.length / CHARS_PER_MS_BACK },
      beat2:       { start: null, duration: 500 },
    }

     // chain the starts
    PHASE.holdFull.start  = PHASE.typeFull.start + PHASE.typeFull.duration
    PHASE.backFull.start  = PHASE.holdFull.start + PHASE.holdFull.duration
    PHASE.beat1.start     = PHASE.backFull.start + PHASE.backFull.duration
    PHASE.typeShort.start = PHASE.beat1.start + PHASE.beat1.duration
    PHASE.holdShort.start = PHASE.typeShort.start + PHASE.typeShort.duration
    PHASE.backShort.start = PHASE.holdShort.start + PHASE.holdShort.duration
    PHASE.beat2.start     = PHASE.backShort.start + PHASE.backShort.duration
    const LOOP_MS = PHASE.beat2.start + PHASE.beat2.duration

    // ease functions
    const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    const tick = (now) => {
      if (cancelled) return
      const elapsed = (now - start) % LOOP_MS

      let next = ''

      if (elapsed < PHASE.holdFull.start) {
        // typing full name
        const t = (elapsed - PHASE.typeFull.start) / PHASE.typeFull.duration
        const eased = easeInOut(Math.min(Math.max(t, 0), 1))
        const n = Math.round(eased * FULL_NAME.length)
        next = FULL_NAME.slice(0, n)
      } else if (elapsed < PHASE.backFull.start) {
        // holding full name
        next = FULL_NAME
      } else if (elapsed < PHASE.beat1.start) {
        // backspacing full name
        const t = (elapsed - PHASE.backFull.start) / PHASE.backFull.duration
        const eased = easeInOut(Math.min(Math.max(t, 0), 1))
        const n = FULL_NAME.length - Math.round(eased * FULL_NAME.length)
        next = FULL_NAME.slice(0, n)
      } else if (elapsed < PHASE.typeShort.start) {
        // beat
        next = ''
      } else if (elapsed < PHASE.holdShort.start) {
        // typing "max"
        const t = (elapsed - PHASE.typeShort.start) / PHASE.typeShort.duration
        const eased = easeInOut(Math.min(Math.max(t, 0), 1))
        const n = Math.round(eased * SHORT_NAME.length)
        next = SHORT_NAME.slice(0, n)
      } else if (elapsed < PHASE.backShort.start) {
        // holding "max"
        next = SHORT_NAME
      } else if (elapsed < PHASE.beat2.start) {
        // backspacing "max"
        const t = (elapsed - PHASE.backShort.start) / PHASE.backShort.duration
        const eased = easeInOut(Math.min(Math.max(t, 0), 1))
        const n = SHORT_NAME.length - Math.round(eased * SHORT_NAME.length)
        next = SHORT_NAME.slice(0, n)
      } else {
        // final beat before loop
        next = ''
      }

      setDisplayed((prev) => (prev === next ? prev : next))
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center w-full">

        <div className="text-center lg:text-left">
          <div ref={statusRef} className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-term opacity-75 animate-pulse-dot" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-term" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-neutral-400">
              max online · btech cse · cyber
            </span>
          </div>

          <h1
            ref={nameRef}
            aria-label={FULL_NAME}
            className="relative text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[0.95] mb-6 text-neutral-100"
          >
            <span aria-hidden="true" className="invisible">{FULL_NAME}</span>
            <span aria-hidden="true" className="absolute inset-0 whitespace-pre-wrap">
              {displayed}
              <span className="inline-block w-[3px] h-[0.85em] bg-term align-[-0.05em] ml-2 animate-blink" />
            </span>
          </h1>

          <p ref={taglineRef} className="font-mono text-sm md:text-base text-neutral-500 mb-8 tracking-wide">
            <span className="text-neutral-700">$</span> whoami <span className="text-neutral-700">→</span> CS Student · Tech Enthusiast · Developer
          </p>

          <p ref={subtextRef} className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light">
            B.Tech CSE. I spend most of my time in cybersecurity, systems programming and Linux, and lately I've been pulling AI into that mix too.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#projects" className="btn-primary justify-center">
              View My Work <span aria-hidden>→</span>
            </a>
            <a href="#contact" className="btn-secondary justify-center">
              Contact Me
            </a>
          </div>
        </div>

        <div ref={graphicRef} className="relative flex justify-center items-center">
          <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px]">
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/[0.03] blur-[60px]" />
            <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-6 rounded-full border border-dashed border-white/[0.10] animate-spin-slow" />
            <div className="absolute inset-14 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-24 rounded-full border border-white/[0.10]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.06]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-term shadow-[0_0_24px_rgba(74,222,128,0.7)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-500" />
            <div className="absolute bottom-6 right-6 w-1 h-1 rounded-full bg-neutral-600" />
            <div className="absolute top-1/3 right-2 w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-neutral-600 uppercase">
              [ system.idle ]
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-600 uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-neutral-700 to-transparent" />
      </div>
    </section>
  )
}
