import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const education = [
  { institution: 'Bennett University', period: '2026 - Present', degree: 'B.Tech in Computer Science', details: '' },
  { institution: "St. Columba's School, New Delhi", period: 'May 2012 - Jun 2025', degree: '', details: 'Student Council · Debating Society · Vector Society · Head, Reboot Society · Head, Decipher Club · Football · Lawn Tennis' },
]

export default function Education() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, titleRef.current], { y: 30, opacity: 0 })
      gsap.to([labelRef.current, titleRef.current], {
        y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { y: 50, opacity: 0 })
        gsap.to(card, {
          y: 0, opacity: 1, duration: 1.3, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="relative py-48 px-6">
      <div className="max-w-3xl mx-auto">
        <div ref={labelRef} className="mono-label mb-6">
          <span className="text-term">04</span> <span className="text-neutral-700">/</span> education
        </div>
        <h2 ref={titleRef} className="section-title mb-20">
          Education & Leadership<span className="text-neutral-600">.</span>
        </h2>

        <div className="space-y-16">
          {education.map((edu, index) => (
            <div key={index} ref={(el) => (cardsRef.current[index] = el)} className="glass-card p-10 md:p-14">
              <div className="flex flex-col gap-4 mb-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-600 uppercase">
                  {edu.period}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-neutral-100 tracking-tight">
                  {edu.institution}
                </h3>
              </div>
              {edu.degree && (
                <p className="text-neutral-300 mb-4 text-lg font-light">{edu.degree}</p>
              )}
              {edu.details && (
                <p className="font-mono text-xs tracking-wide text-neutral-500 leading-[2]">
                  {edu.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
