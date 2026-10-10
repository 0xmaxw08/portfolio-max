import { useEffect, useRef } from 'react'

/**
 * Custom cursor built from a chain of lerped points.
 *  - point[0] follows the real cursor tightly
 *  - each subsequent point follows the one before it, producing a smooth snake
 *  - a lagging ring sits behind the head for a magnetic feel
 * The native cursor is hidden globally via CSS.
 */
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

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      visible = true
    }
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
      // head chases real cursor
      points[0].x += (mouse.x - points[0].x) * HEAD_EASE
      points[0].y += (mouse.y - points[0].y) * HEAD_EASE
      // each following point chases the one ahead of it
      for (let i = 1; i < POINTS; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * LINK_EASE
        points[i].y += (points[i - 1].y - points[i].y) * LINK_EASE
      }
      // lagging ring
      ring.x += (mouse.x - ring.x) * ring.ease
      ring.y += (mouse.y - ring.y) * ring.ease

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (visible) {
        // snake trail — draw tail first so head sits on top
        for (let i = POINTS - 1; i >= 1; i--) {
          const p = points[i]
          const t = 1 - i / POINTS
          const r = (0.6 + t * 3.2) * dpr
          const a = 0.04 + t * 0.5
          ctx.beginPath()
          ctx.arc(p.x * dpr, p.y * dpr, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(235,235,235,${a})`
          ctx.fill()
        }

        // lagging ring
        const ringR = (pressed ? 10 : 15) * dpr
        ctx.beginPath()
        ctx.arc(ring.x * dpr, ring.y * dpr, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = pressed ? 'rgba(74,222,128,0.55)' : 'rgba(255,255,255,0.22)'
        ctx.lineWidth = 1 * dpr
        ctx.stroke()

        // soft green glow at the head
        const head = points[0]
        const grd = ctx.createRadialGradient(
          head.x * dpr, head.y * dpr, 0,
          head.x * dpr, head.y * dpr, 18 * dpr
        )
        grd.addColorStop(0, 'rgba(74,222,128,0.45)')
        grd.addColorStop(1, 'rgba(74,222,128,0)')
        ctx.beginPath()
        ctx.arc(head.x * dpr, head.y * dpr, 18 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // crisp head dot
        ctx.beginPath()
        ctx.arc(head.x * dpr, head.y * dpr, 3 * dpr, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,255,245,0.98)'
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
