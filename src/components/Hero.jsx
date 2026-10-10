import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import MagneticButton from './ui/MagneticButton';
import { ArrowDown, Mail } from 'lucide-react';
export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="mb-6"><span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md">Available for opportunities</span></motion.div>
        <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">Manvendra Snehasish</motion.h1>
        <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl text-primary font-medium mb-4">Computer Science Student | Tech Enthusiast | Developer</motion.h2>
        <motion.p variants={fadeInUp} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Building innovative solutions and exploring the intersection of AI, Data Science, and DevOps.</motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton onClick={() => scrollTo('projects')} className="bg-white text-slate-950 hover:bg-slate-200 flex items-center gap-2">View My Work <ArrowDown size={18} /></MagneticButton>
          <MagneticButton onClick={() => scrollTo('contact')} className="glass text-white hover:bg-white/10 flex items-center gap-2">Contact Me <Mail size={18} /></MagneticButton>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 2, duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"><ArrowDown size={24} /></motion.div>
    </section>
  );
}
