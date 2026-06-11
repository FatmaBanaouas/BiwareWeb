import { useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function Numbers() {
  const { t, i18n } = useTranslation()

  const numbers = useMemo(() => [
    { value: 2011, label: t('hero.stat_founded'),   suffix: '' },
    { value: 30,   label: t('hero.stat_engineers'), suffix: '+' },
    { value: 11,   label: t('hero.stat_clients'),   suffix: '+' },
    { value: 4,    label: t('hero.stat_countries'), suffix: '' },
    { value: 14,   label: t('hero.stat_expertise'), suffix: 'ans' },

  ], [i18n.language])

  return (
    <section style={{
      padding: '5rem 3rem', background: 'var(--bw-orange)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />
      <div className="numbers-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {numbers.map((num, idx) => (
          <NumberItem key={idx} num={num} delay={idx} />
        ))}
      </div>
    </section>
  )
}

function NumberItem({ num, delay }) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const animateValue = (el, target) => {
      if (target === 2011) { el.textContent = '2011'; return }
      const duration = 1800
      const startTime = performance.now()
      const update = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(target * ease)
        el.textContent = current + num.suffix
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
    }
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      if (ref.current && !animated.current) { animated.current = true; animateValue(ref.current, num.value) }
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          animateValue(entry.target, num.value)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [num.value, num.suffix])

  return (
    <div className={`reveal reveal-d${delay + 1}`}>
      <div ref={ref} style={{
        fontFamily: 'var(--font)', fontSize: '2.8rem', fontWeight: 900,
        color: '#fff', letterSpacing: '-0.04em', lineHeight: 1,
      }}>0</div>
      <div style={{
        fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)',
        marginTop: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{num.label}</div>
    </div>
  )
}