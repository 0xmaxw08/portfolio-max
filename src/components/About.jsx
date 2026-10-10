import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const focus = [
  'Systems programming, C and Linux',
  'Cybersecurity',
  'AI and machine learning',
]

export default function About() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [labelRef.current, titleRef.current, textRef.current]
      gsap.set(els, { y: 40, opacity: 0 })
      gsap.to(els, {
        y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={labelRef} className="mono-label mb-6">
          <span className="text-term">01</span> <span className="text-neutral-700">/</span> about
        </div>
        <h2 ref={titleRef} className="section-title mb-14">
          A quick intro<span className="text-neutral-600">.</span>
        </h2>

        <div ref={textRef} className="glass-card p-8 md:p-12">
          <p className="text-lg md:text-xl text-neutral-400 leading-[1.8] font-light mb-8">
            I'm a CS student who ended up on the deeper end of computing. C, Linux, systems programming, the stuff most people skip past. I like knowing how software actually runs on hardware instead of just trusting that it does.
          </p>

          <p className="text-lg md:text-xl text-neutral-400 leading-[1.8] font-light mb-10">
            Lately I've been bringing AI and ML into the same picture. That middle ground between systems and intelligence is where things get interesting for me. I build small projects to understand big ideas, read far more docs than I probably should, and I still get genuinely excited when something finally clicks after hours of staring at it.
          </p>

          <div className="pt-8 border-t border-white/[0.06]">
            <div className="mono-label mb-6">
              <span className="text-neutral-700">//</span> current_focus
            </div>
            <ul className="space-y-3">
              {focus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-400 font-light">
                  <span className="text-term font-mono text-sm leading-7 select-none">›</span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
