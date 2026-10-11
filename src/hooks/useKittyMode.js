import { useEffect, useRef, useState } from 'react'

const SECRET = 'kitty'

export default function useKittyMode() {
  const [active, setActive] = useState(false)
  const [toast, setToast] = useState(null)
  const [pulse, setPulse] = useState(0)
  const bufferRef = useRef('')

  useEffect(() => {
    const toggle = () => {
      setActive((a) => !a)
      setPulse((p) => p + 1)
    }

    const onKey = (e) => {
      const el = e.target
      const tag = (el && el.tagName ? el.tagName : '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || (el && el.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (typeof e.key !== 'string' || e.key.length !== 1) return

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SECRET.length)
      if (bufferRef.current === SECRET) {
        bufferRef.current = ''
        toggle()
      }
    }
    const onToggle = () => toggle()

    window.addEventListener('keydown', onKey)
    window.addEventListener('kitty:toggle', onToggle)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('kitty:toggle', onToggle)
    }
  }, [])

  useEffect(() => {
    // gate a global transition to smooth the theme swap
    document.body.classList.add('theme-switching')

    if (active) {
      document.body.classList.add('kitty-mode')
      setToast('on')
    } else {
      document.body.classList.remove('kitty-mode')
      setToast((t) => (t === null ? null : 'off'))
    }

    const removeSwitch = setTimeout(() => document.body.classList.remove('theme-switching'), 850)
    const hideToast = setTimeout(() => setToast(null), 2400)
    return () => {
      clearTimeout(removeSwitch)
      clearTimeout(hideToast)
    }
  }, [active])

  return { active, toast, pulse }
}
