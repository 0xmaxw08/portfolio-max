import { useEffect, useRef, useState } from 'react'

const SECRET = 'kitty'

export default function useKittyMode() {
  const [active, setActive] = useState(false)
  const [toast, setToast] = useState(null) // 'on' | 'off' | null
  const bufferRef = useRef('')

  // Listen for the secret key sequence + custom toggle event
  useEffect(() => {
    const onKey = (e) => {
      // Ignore typing inside inputs / textareas / contenteditable
      const el = e.target
      const tag = (el && el.tagName ? el.tagName : '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || (el && el.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (typeof e.key !== 'string' || e.key.length !== 1) return

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SECRET.length)
      if (bufferRef.current === SECRET) {
        bufferRef.current = ''
        setActive((a) => !a)
      }
    }
    const onToggle = () => setActive((a) => !a)

    window.addEventListener('keydown', onKey)
    window.addEventListener('kitty:toggle', onToggle)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('kitty:toggle', onToggle)
    }
  }, [])

  // Apply/remove body class + show toast
  useEffect(() => {
    if (active) {
      document.body.classList.add('kitty-mode')
      setToast('on')
    } else {
      document.body.classList.remove('kitty-mode')
      setToast((t) => (t === null ? null : 'off'))
    }
    const timer = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(timer)
  }, [active])

  return { active, toast }
}
