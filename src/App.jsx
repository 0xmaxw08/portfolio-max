import useLenis from './hooks/useLenis'
import MouseTrail from './components/MouseTrail'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Footer from './components/Footer'

function App() {
  useLenis()

  return (
    <div className="relative min-h-screen overflow-hidden scanlines">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full bg-white/[0.015] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vh] rounded-full bg-white/[0.012] blur-[120px]" />
      </div>
      <MouseTrail />
      <BackToTop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
      </main>
      <Footer />
    </div>
  )
}

export default App
