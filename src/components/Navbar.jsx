import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'about', href: '#about' },
    { name: 'projects', href: '#projects' },
    { name: 'experience', href: '#experience' },
    { name: 'education', href: '#education' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
      scrolled ? 'glass py-3' : 'py-6 border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-neutral-200 hover:text-white transition-colors">
          <span className="text-term">~/</span>0xmaxw08
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>
        <a href="#contact"
           className="font-mono text-xs px-4 py-2 rounded-full border border-white/10 text-neutral-300 hover:border-white/30 hover:text-white transition-all duration-500">
          ./contact
        </a>
      </div>
    </nav>
  )
}
