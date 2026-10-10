import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Member',
    org: 'Data Science Society BU',
    date: 'Oct 2026 - Present',
    location: 'India · On-site',
    description: 'On the tech team. Python tooling, some networking, and cleaning up raw data into something people can actually read.',
    skills: ['Python', 'Networking'],
  },
  {
    role: 'Member',
    org: 'Devops Society BU',
    date: 'Oct 2026 - Present',
    location: 'India · On-site',
    description: 'On the tech team. Automating the repetitive parts, wiring up pipelines, and trying to make deploys hurt less.',
    skills: ['DevOps', 'Automation'],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  const headRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, titleRef.current], { y: 30, opacity: 0 })
      gsap.to([labelRef.current, titleRef.current], {
        y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })

      itemsRef.current.forEach((item) => {
        if (!item) return
        gsap.set(item, { y: 40, opacity: 0 })
        gsap.to(item, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        })
      })

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 70%',
        end: 'bottom 65%',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${p})`
          }
          if (headRef.current) {
            headRef.current.style.top = `${p * 100}%`
          }
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={labelRef} className="mono-label mb-6">
          <span className="text-term">03</span> <span className="text-neutral-700">/</span> experience
        </div>
        <h2 ref={titleRef} className="section-title mb-16">
          Where I've been<span className="text-neutral-600">.</span>
        </h2>

        {/* Container reserves a 56px gutter on the left for the timeline. */}
        <div ref={timelineRef} className="relative pl-14">
          {/* Static faint track — sits at x=28px, well clear of the cards */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-white/[0.08]" />

          {/* White progress streak */}
          <div className="absolute left-7 top-0 bottom-0 w-px pointer-events-none overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-top bg-white"
              style={{ transform: 'scaleY(0)', willChange: 'transform' }}
            />
          </div>

          {/* Glowing head that rides the tip of the streak */}
          <div
            ref={headRef}
            className="absolute left-7 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white pointer-events-none"
            style={{
              top: '0%',
              willChange: 'top',
              boxShadow: '0 0 0 3px rgba(255,255,255,0.10), 0 0 14px 4px rgba(255,255,255,0.35)',
            }}
          />

          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative mb-12 last:mb-0"
            >
              {/* Dot aligned to the track: item starts at x=56, line at x=28, so offset -28px */}
              <div className="absolute top-8 left-[-28px] -translate-x-1/2 w-3 h-3 rounded-full bg-ink-950 border border-white/20">
                <div className="absolute inset-1 rounded-full bg-term/80" />
              </div>

              <div className="glass-card p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h3 className="text-lg font-medium text-neutral-100">{exp.role}</h3>
                  <span className="font-mono text-[11px] tracking-wider text-neutral-500">{exp.date}</span>
                </div>
                <p className="text-neutral-300 mb-1">{exp.org}</p>
                <p className="font-mono text-[11px] tracking-wider text-neutral-600 mb-4">{exp.location}</p>
                <p className="text-neutral-400 text-sm mb-5 font-light leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/[0.08] text-neutral-500">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
