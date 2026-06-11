import { useTranslation } from 'react-i18next';

export default function Cta({ onOpenQuote, onOpenContact }) {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="cta-section" style={{
      padding: '7rem 3rem',
      background: 'var(--bw-darker)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="reveal">
          <h2 style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.25rem',
          }}>
            {t('cta.title')}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            {t('cta.subtitle')}
          </p>
          <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onOpenQuote}>{t('cta.btn_devis')}</button>
            <button className="btn-ghost" onClick={onOpenContact}>{t('cta.btn_contact')}</button>
          </div>
        </div>
      </div>
    </section>
  )
}