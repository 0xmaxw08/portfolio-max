import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [labelRef.current, titleRef.current, cardRef.current]
      gsap.set(els, { y: 50, opacity: 0 })
      gsap.to(els, {
        y: 0, opacity: 1, duration: 1.2, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={labelRef} className="mono-label mb-6">
          <span className="text-term">02</span> <span className="text-neutral-700">/</span> projects
        </div>
        <h2 ref={titleRef} className="section-title mb-14">
          Featured work<span className="text-neutral-600">.</span>
        </h2>

        <div ref={cardRef} className="glass-card overflow-hidden p-0">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            <div className="relative bg-ink-900 border-b md:border-b-0 md:border-r border-white/[0.06] aspect-square md:aspect-auto md:min-h-[420px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.35]"
                   style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-term animate-pulse-dot" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-600 uppercase">
                  [ suki.mockup ]
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="font-mono text-[11px] tracking-[0.2em] text-neutral-600 uppercase mb-4">
                project_01 · in_progress
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-neutral-100 mb-3 tracking-tight">
                Suki
              </h3>
              <p className="font-mono text-xs text-neutral-500 mb-6 tracking-wide">
                AI Desktop Companion
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8 font-light">
                A desktop companion that actually stays out of the way. It reads context, responds to what you mean rather than what you typed, and handles the small stuff so you don't lose focus switching tabs.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Python', 'AI/ML Models', 'Desktop UI'].map((tech) => (
                  <span key={tech} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/[0.08] text-neutral-500">
                    {tech}
                  </span>
                ))}
              </div>

              <a href="https://github.com/0xmaxw08/suki" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors duration-500 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                <span className="font-mono text-xs tracking-wider">view_repo</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
