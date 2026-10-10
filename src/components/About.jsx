import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} className="glass rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">About Me</h2>
          <p className="text-slate-300 text-lg leading-relaxed">I am a Computer Science student at <span className="text-primary font-medium">Bennett University</span> with a passion for technology. I am actively involved in tech communities, currently serving as a Member of the <span className="text-accent font-medium">Data Science Society BU</span> and the <span className="text-accent font-medium">Devops Society BU</span>.</p>
          <p className="text-slate-300 text-lg leading-relaxed mt-4">I love leading initiatives, having previously been the Head of the <span className="text-white font-medium">Reboot Society</span> and <span className="text-white font-medium">Decipher Club</span> during my school years.</p>
        </motion.div>
      </div>
    </section>
  );
}
