import { useTranslation } from 'react-i18next';
import biwareLogo from "../assets/Biware_Logo_noir_page-0001-removebg-preview.png";

export default function Footer() {
  const { t } = useTranslation();

  const iconStyle = {
    width: 30, height: 30, borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.07)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'all 0.2s',
  }

  return (
    <>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.15rem 3rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2.5rem',
          flexWrap: 'wrap', maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t('footer.address')}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t('footer.phone')}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t('footer.email')}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t('footer.website')}</strong>
          </div>
        </div>
      </div>

      <footer className="footer-root" style={{
        padding: '1.5rem 3rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem', maxWidth: '100%',
        background: 'var(--bw-darker)',
      }}>
        <img src={biwareLogo} alt={t('footer.company_name')} style={{ height: '70px', width: 'auto', transition: 'height 0.3s' }} />

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[t('footer.legal'), t('footer.privacy')].map(link => (
            <a key={link} href="#" style={{
              fontSize: '0.73rem', color: 'rgba(255,255,255,0.2)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href="https://www.linkedin.com/company/biware-consulting/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer" style={iconStyle}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,101,34,0.3)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/biwareconsulting"
            target="_blank" rel="noopener noreferrer" style={iconStyle}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(242,101,34,0.3)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        </div>
      </footer>
    </>
  )
}