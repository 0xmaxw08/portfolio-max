import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef(null)
  const statusRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)
  const graphicRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(statusRef.current, { y: 20, opacity: 0, duration: 1 })
        .from(nameRef.current, { y: 80, opacity: 0, duration: 1.4 }, '-=0.6')
        .from(taglineRef.current, { y: 30, opacity: 0, duration: 1.2 }, '-=0.9')
        .from(subtextRef.current, { y: 20, opacity: 0, duration: 1.2 }, '-=0.9')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 1 }, '-=0.8')
        .from(graphicRef.current, { scale: 0.92, opacity: 0, duration: 1.6 }, '-=1.4')
    }, sectionRef)
    return () => ctx.revert()
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

          <h1 ref={nameRef} className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[0.95] mb-6 text-neutral-100">
            Manvendra<br />Snehasish<span className="inline-block w-[3px] h-[0.85em] bg-term align-[-0.05em] ml-2 animate-blink" />
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
