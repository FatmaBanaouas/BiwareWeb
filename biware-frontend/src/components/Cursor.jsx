import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)

  
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMouseMove = (e) => {
      mx.current = e.clientX
      my.current = e.clientY
      cursor.style.left = mx.current + 'px'
      cursor.style.top = my.current + 'px'
    }

    const animateRing = () => {
      rx.current += (mx.current - rx.current) * 0.12
      ry.current += (my.current - ry.current) * 0.12
      if (ring) {
        ring.style.left = rx.current + 'px'
        ring.style.top = ry.current + 'px'
      }
      requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMouseMove)
    animateRing()

    const interactive = document.querySelectorAll('a, button, .client-card, .pillar-card, .form-card, .svc-card')
    const onEnter = () => {
      if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px' }
      if (ring) { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'rgba(242,101,34,0.8)' }
    }
    const onLeave = () => {
      if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px' }
      if (ring) { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(242,101,34,0.5)' }
    }
    interactive.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactive.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      <div ref={cursorRef} style={{
        width: 12, height: 12, background: 'var(--bw-orange)', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%, -50%)', transition: 'width 0.2s, height 0.2s',
      }} />
      <div ref={ringRef} style={{
        width: 40, height: 40, border: '1.5px solid rgba(242,101,34,0.5)', borderRadius: '50%',
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%, -50%)', transition: 'all 0.12s var(--ease)',
      }} />
    </>
  )
}