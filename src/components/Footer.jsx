import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, Mail, Heart } from 'lucide-react';
export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-white/10 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl font-bold mb-6">Let's Build Something <span className="text-primary">Amazing</span> Together</motion.h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Feel free to reach out for collaborations, tech discussions, or just a friendly hello.</p>
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-white/10 hover:scale-110 transition-all duration-300 text-slate-300 hover:text-white"><Code2 size={24} /></a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-white/10 hover:scale-110 transition-all duration-300 text-slate-300 hover:text-white"><Briefcase size={24} /></a>
          <a href="mailto:your.email@example.com" className="p-3 rounded-full glass hover:bg-white/10 hover:scale-110 transition-all duration-300 text-slate-300 hover:text-white"><Mail size={24} /></a>
        </div>
        <div className="text-slate-500 text-sm flex items-center justify-center gap-1">
          <span>Designed & Built with</span> <Heart size={14} className="text-red-500 fill-red-500" /> <span>by Manvendra Snehasish © 2026</span>
        </div>
      </div>
    </footer>
  );
}
