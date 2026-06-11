import { useState, useEffect } from 'react'
import biwareLogo from "../assets/logo_facebook_2.png";
import { useTranslation } from 'react-i18next';

export default function Navbar({ onOpenQuote }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const toggleLang = () => i18n.changeLanguage(currentLang === 'fr' ? 'en' : 'fr');

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navItems = [
    ['mission', 'nav.mission'],
    ['clients', 'nav.clients'],
    ['produits', 'nav.produits'],
    ['formations', 'nav.formations'],
    ['expertises', 'nav.expertises'],
    ['carrieres', 'nav.carrieres'],
    ['contact', 'nav.contact'],
  ]

  const iconStyle = {
    width: 32, height: 32, borderRadius: 8, border: '1px solid var(--bw-border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 700,
    textDecoration: 'none', transition: 'all 0.2s',
  }

  return (
    <>
      <nav
        className="nav-root"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '0.8rem 3rem' : '1.1rem 3rem',
          background: scrolled ? 'rgba(17,17,18,0.97)' : 'rgba(17,17,18,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--bw-border)',
          transition: 'all 0.3s',
        }}
      >
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={biwareLogo} alt="Biware" style={{ height: '40px', width: 'auto' }} />
        </a>


        <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {navItems.map(([id, key]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }}
                style={{
                  fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none', fontWeight: 500,
                  letterSpacing: '0.02em', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>


        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Social icons — hidden on mobile via CSS */}
          <a href="https://www.linkedin.com/company/biware-consulting/posts/?feedView=all"
            target="_blank" rel="noopener noreferrer" style={iconStyle}
            className="nav-social"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bw-orange)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bw-border)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/biwareconsulting"
            target="_blank" rel="noopener noreferrer" style={iconStyle}
            className="nav-social"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bw-orange)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bw-border)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          <button className="nav-devis-btn btn-nav" onClick={onOpenQuote} style={{
            background: 'var(--bw-orange)', color: '#fff',
            fontFamily: 'var(--font)', fontSize: '0.8rem', fontWeight: 700,
            padding: '0.55rem 1.3rem', borderRadius: 8, border: 'none',
            cursor: 'pointer', letterSpacing: '0.03em',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            {t('nav.devis')}
          </button>

   
          <button onClick={toggleLang} style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bw-border)',
            borderRadius: 8, padding: '0.35rem 0.7rem',
            color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bw-orange)'; e.currentTarget.style.color = 'var(--bw-orange)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bw-border)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {currentLang === 'fr' ? 'EN' : 'FR'}
          </button>

  
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none', // shown via CSS on mobile
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--bw-border)',
              borderRadius: 8, padding: '0.4rem',
              cursor: 'pointer', color: '#fff',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

   
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 999,
            background: 'rgba(17,17,18,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--bw-border)',
            flexDirection: 'column',
            padding: '1rem 1.25rem 1.5rem',
            gap: '0.25rem',
            animation: 'slideDown 0.2s ease',
          }}
        >
          {navItems.map(([id, key]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
              fontWeight: 500, padding: '0.75rem 0',
              cursor: 'pointer', textAlign: 'left',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              transition: 'color 0.2s', fontFamily: 'inherit',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            >
              {t(key)}
            </button>
          ))}
          <button className="btn-primary" onClick={() => { onOpenQuote(); setMenuOpen(false) }}
            style={{ marginTop: '1rem', width: '100%', cursor: 'pointer' }}>
            {t('nav.devis')}
          </button>
        </div>
      )}

      <style>{`
        .btn-nav:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(242,101,34,0.35); }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-social { display: none !important; }
          .nav-devis-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 768px) {
          .nav-root { padding: 0.85rem 1.25rem !important; }
        }
      `}</style>
    </>
  )
}