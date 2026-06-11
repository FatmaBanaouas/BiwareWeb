import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const stats = [
    ['2011', t('hero.stat_founded')],
    ['30+', t('hero.stat_engineers')],
    ['11+', t('hero.stat_clients')],
    ['4', t('hero.stat_countries')],
    ['14ans', t('hero.stat_expertise')],
  ]

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '7rem 3rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
     
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,101,34,0.18) 0%, transparent 70%)',
        top: -200, left: -100, filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'float1 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,168,156,0.12) 0%, transparent 70%)',
        bottom: -100, right: -80, filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'float2 10s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'float3 12s ease-in-out infinite',
      }} />

   
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}>
    
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(242,101,34,0.12)', border: '1px solid rgba(242,101,34,0.3)',
          color: 'var(--bw-orange)', fontSize: '0.72rem', fontWeight: 700,
          padding: '0.35rem 1rem', borderRadius: 30, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: '1.75rem',
          animation: 'fadeUp 0.8s var(--ease) both',
        }}>
          <span style={{
            width: 6, height: 6, background: 'var(--bw-orange)', borderRadius: '50%',
            animation: 'pulse-dot 1.5s ease-in-out infinite',
          }} />
          {t('hero.badge')}
        </div>

        <h1 style={{
          fontFamily: 'var(--font)', fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em',
          marginBottom: '1.5rem', animation: 'fadeUp 0.8s 0.1s var(--ease) both',
        }}>
          {t('hero.title_line1')}<br />
          <span style={{ color: 'var(--bw-orange)' }}>{t('hero.title_line2')}</span><br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>{t('hero.title_line3')}</span>
        </h1>

        
        <p style={{
          fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
          maxWidth: 580, margin: '0 auto 2.5rem', fontWeight: 300,
          animation: 'fadeUp 0.8s 0.2s var(--ease) both',
        }}>
          {t('hero.subtitle')}
        </p>

        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.3s var(--ease) both',
        }}>
          <button className="btn-primary" onClick={() => scrollTo('produits')}>
            {t('hero.btn_solutions')}
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('clients')}>
            {t('hero.btn_references')}
          </button>
        </div>

     
        <div style={{
          display: 'flex', gap: '2.5rem', justifyContent: 'center',
          marginTop: '4rem', paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.5s var(--ease) both',
        }}>
          {stats.map(([num, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font)', fontSize: '2rem', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1,
              }}>
                {num.includes('+') ? (
                  <>{num.replace('+', '')}<span style={{ color: 'var(--bw-orange)' }}>+</span></>
                ) : num}
              </div>
              <div style={{
                fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)',
                marginTop: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

   
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.2)',
        fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        SCROLL
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(60px,40px); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,-30px); } }
        @keyframes float3 { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.3); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @keyframes pulse-dot { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(242,101,34,0.4); } 50% { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(242,101,34,0); } }
      `}</style>
    </section>
  )
}