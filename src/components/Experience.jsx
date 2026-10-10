import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Network, Settings } from 'lucide-react';
const experiences = [
  { title: "Member", org: "Data Science Society BU", date: "Oct 2026 - Present", location: "India · On-site", desc: "Member of the tech department.", skills: ["Python (Programming Language)", "Networking"], icon: <Network size={20} /> },
  { title: "Member", org: "Devops Society BU", date: "Oct 2026 - Present", location: "India · On-site", desc: "Member of the tech team.", skills: ["DevOps", "Automation"], icon: <Settings size={20} /> }
];
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="experience" className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} ref={ref}>
          <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">Work <span className="text-accent">Experience</span></motion.h2>
          <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">{exp.icon} {exp.title} at {exp.org}</h3>
                    <span className="text-sm text-slate-400 mt-1 md:mt-0">{exp.date} · {exp.location}</span>
                  </div>
                  <p className="text-slate-300 mb-4">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (<span key={skill} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{skill}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
