import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { GraduationCap, Award } from 'lucide-react';
export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="education" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} ref={ref}>
          <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">Education & <span className="text-primary">Leadership</span></motion.h2>
          <div className="space-y-6">
            <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="p-3 rounded-full bg-primary/10 text-primary"><GraduationCap size={24} /></div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-white">Bennett University</h3>
                <p className="text-primary font-medium">B.Tech in Computer Science</p>
                <p className="text-slate-400 text-sm mt-1">2026 - Present</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="p-3 rounded-full bg-accent/10 text-accent"><Award size={24} /></div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-white">St. Columba's School, New Delhi</h3>
                <p className="text-slate-400 text-sm mt-1 mb-4">May 2012 - Jun 2025</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Activities & Societies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Student Council', 'Debating Society', 'Vector Society', 'Head - Reboot Society', 'Head - Decipher Club', 'Football', 'Lawn Tennis'].map((activity) => (
                      <span key={activity} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">{activity}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
