import { useEffect, useRef } from 'react'

export default function MouseTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0, h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: w / 2, y: h / 2 }
    const isTouch = window.matchMedia('(hover: none)').matches
    let visible = !isTouch

    const POINTS = 24
    const HEAD_EASE = 0.42
    const LINK_EASE = 0.5
    const points = Array.from({ length: POINTS }, () => ({ x: mouse.x, y: mouse.y }))
    const ring = { x: mouse.x, y: mouse.y, ease: 0.14 }
    let pressed = false

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; visible = true }
    const onLeave = () => { visible = false }
    const onEnter = () => { visible = true }
    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    let raf
    const render = () => {
      points[0].x += (mouse.x - points[0].x) * HEAD_EASE
      points[0].y += (mouse.y - points[0].y) * HEAD_EASE
      for (let i = 1; i < POINTS; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * LINK_EASE
        points[i].y += (points[i - 1].y - points[i].y) * LINK_EASE
      }
      ring.x += (mouse.x - ring.x) * ring.ease
      ring.y += (mouse.y - ring.y) * ring.ease

      const kitty = document.body.classList.contains('kitty-mode')
      const TAIL_R = kitty ? 255 : 235
      const TAIL_G = kitty ? 105 : 235
      const TAIL_B = kitty ? 180 : 235
      const HEAD_COLOR = kitty ? 'rgba(255,120,170,0.98)' : 'rgba(245,255,245,0.98)'
      const GLOW_COLOR = kitty ? 'rgba(255,77,141,0.5)' : 'rgba(74,222,128,0.45)'
      const RING_COLOR = pressed
        ? (kitty ? 'rgba(255,77,141,0.65)' : 'rgba(74,222,128,0.55)')
        : (kitty ? 'rgba(255,105,180,0.45)' : 'rgba(255,255,255,0.22)')

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (visible) {
        for (let i = POINTS - 1; i >= 1; i--) {
          const p = points[i]
          const t = 1 - i / POINTS
          const r = (0.6 + t * 3.2) * dpr
          const a = 0.04 + t * 0.5
          ctx.beginPath()
          ctx.arc(p.x * dpr, p.y * dpr, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${TAIL_R},${TAIL_G},${TAIL_B},${a})`
          ctx.fill()
        }

        const ringR = (pressed ? 10 : 15) * dpr
        ctx.beginPath()
        ctx.arc(ring.x * dpr, ring.y * dpr, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = RING_COLOR
        ctx.lineWidth = 1 * dpr
        ctx.stroke()

        const head = points[0]
        const grd = ctx.createRadialGradient(
          head.x * dpr, head.y * dpr, 0,
          head.x * dpr, head.y * dpr, 18 * dpr
        )
        grd.addColorStop(0, GLOW_COLOR)
        grd.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(head.x * dpr, head.y * dpr, 18 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(head.x * dpr, head.y * dpr, 3 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = HEAD_COLOR
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60]"
    />
  )
}
