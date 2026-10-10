import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Code2, ExternalLink } from 'lucide-react';
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} ref={ref}>
          <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">Featured <span className="text-primary">Projects</span></motion.h2>
          <motion.div variants={fadeInUp} className="glass rounded-3xl overflow-hidden group hover:border-primary/30 transition-colors duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-slate-900/50 p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-full max-w-sm aspect-video bg-slate-800 rounded-lg border border-slate-700 shadow-2xl flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-slate-500 font-display text-xl">Suki UI Mockup</span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-display text-3xl font-bold mb-4 text-white">Suki</h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">Suki is an innovative AI desktop companion designed to assist users with daily tasks, providing a seamless and interactive desktop experience.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Python', 'AI/ML Models', 'Desktop UI Frameworks'].map((tech) => (<span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">{tech}</span>))}
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/yourusername/suki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"><Code2 size={20} /> GitHub</a>
                  <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"><ExternalLink size={20} /> Live Demo</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
